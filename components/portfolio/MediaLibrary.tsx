import { useEffect, useState, useRef } from "react";
import s from "./MediaLibrary.module.scss";
import cn from 'classnames'
import { KCImage as Image } from '/components'
import { Loader, FileInput } from "/components";
import { useSession } from "next-auth/react"

export type Props = {
  onSelect?: (image: FileField) => void
  onSelection?: (images: FileField[]) => void
  selected: FileField[]
  multi: boolean
}

export default function MediaLibrary({ onSelect, onSelection, multi, selected: selectedFromProps = [] }: Props) {

  const { data: session, status } = useSession()
  const [selected, setSelected] = useState<FileField[]>(selectedFromProps)
  const [images, setImages] = useState<FileField[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<Error | undefined>()
  const [progress, setProgress] = useState<number | undefined>()
  const uploadRef = useRef<HTMLInputElement | null>()

  async function handleRefresh() {
    const images = await (await fetch('/api/account/images')).json()
    setImages(images)
  }

  const handleUploadDone = (upload: any) => handleRefresh()
  const handleUploadProgress = (progress: number) => setProgress(progress)
  const handleUploading = (upload: boolean) => setUploading(upload)
  const handleUploadError = (err: Error) => setUploadError(err)

  const handleClick = (e, img) => {
    const { metaKey } = e;

    if (multi && !metaKey)
      setSelected((s) => s.find(el => el.id === img.id) ? [...s.filter(el => el.id !== img.id)] : [...s, img])
    else if (metaKey) {
      onSelect(img)
    }
  }
  useEffect(() => {
    onSelection(selected)
  }, [selected])

  useEffect(() => {
    if (status !== 'authenticated') return
    handleRefresh()
  }, [session, status])

  return (
    <>
      <ul className={s.gallery}>
        {images?.map((img, idx) =>
          <li
            key={idx}
            className={cn(selected.find(el => el.id === img.id) && s.selected)}
            onClick={(e) => handleClick(e, img)}
          >
            <Image
              data={img.responsiveImage}
              className={s.thumb}
              usePlaceholder={false}
              objectFit="contain"
            />
          </li>
        )}
        <li className={s.upload}>
          {progress === undefined || progress === 100 && !uploading ?
            <button type="button" onClick={() => uploadRef.current.click()}>
              Ladda upp
            </button>
            :
            <Loader message={progress === undefined ? 'Laddar upp...' : progress === 100 ? 'Sparar...' : progress + '%'} />
          }
        </li>
      </ul>
      <FileInput
        ref={uploadRef}
        customData={{}}
        tags={[session?.user.email]}
        accept=".jpg,.png"
        onDone={handleUploadDone}
        onProgress={handleUploadProgress}
        onUploading={handleUploading}
        onError={handleUploadError}
      />
    </>
  )
}
