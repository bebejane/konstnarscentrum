import { useEffect, useState, useRef } from "react";
import s from "./MediaLibrary.module.scss";
import cn from 'classnames'
import { KCImage as Image } from '/components'
import { Loader, FileUpload } from "/components";
import { useSession } from "next-auth/react"
import { ImageData } from "/components/common/FileUpload";
import { regions } from "/lib/region";

export type Props = {
  onSelect?: (image: FileField) => void
  onSelection?: (images: FileField[]) => void
  onShowLibrary?: (show: boolean) => void
  onError?: (err: Error) => void
  onRemove?: (id: string) => void
  showLibrary: boolean
  selected?: FileField[]
  multi: boolean
  member: MemberRecord
}

export default function MediaLibrary({ onSelect, onSelection, onShowLibrary, showLibrary, onRemove, multi, member, selected = [] }: Props) {


  const { data: session, status } = useSession()
  const [images, setImages] = useState<FileField[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadImageData, setUploadImageData] = useState<ImageData | undefined>()
  const [error, setError] = useState<Error | undefined>()
  const [loading, setLoading] = useState(false)
  const [uploadError, setUploadError] = useState<Error | undefined>()
  const [progress, setProgress] = useState<number | undefined>()
  const uploadRef = useRef<HTMLInputElement | null>()

  async function handleRefresh() {
    setLoading(true)
    setError(undefined)

    try {
      const res = await fetch('/api/account/images', { method: 'GET' })
      if (res.status !== 200)
        throw new Error('Det uppstod ett fel vid hämtning av bilder')
      const { images } = await res.json()
      setImages(images)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  const handleRemove = async (e, id) => {
    e.stopPropagation()

    if (!showLibrary) return onRemove?.(id)

    setLoading(true)

    try {
      const res = await fetch(`/api/account/images?removeId=${encodeURIComponent(id)}`, { method: 'GET' })
      const { images, error } = await res.json()

      if (res.status !== 200 || error) {
        if (error.codes.includes('UPLOAD_IS_CURRENTLY_IN_USE'))
          throw new Error('Det går ej att ta bort bilden. Bilden används i din portfolio redan. För att ta bort bilden måste du ta bort den där den används i portfolion.')
        throw new Error('Det uppstod ett fel när bilden togs bort')
      }
      onRemove?.(id)
      setImages(images)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  const handleClick = (e, img) => {
    if (multi && showLibrary)
      onSelection(selected.find(el => el.id === img.id) ? [...selected.filter(el => el.id !== img.id)] : [...selected, img])
    else
      onSelect(img)
  }

  const handleUploadDone = (upload: any) => handleRefresh()
  const handleUploadProgress = (progress: number) => setProgress(progress)
  const handleUploading = (upload: boolean) => setUploading(upload)
  const handleUploadError = (err: Error) => setUploadError(err)
  const handleUploadImageData = (image: ImageData) => setUploadImageData(image)

  useEffect(() => {
    if (status !== 'authenticated') return
    handleRefresh()
  }, [session, status])

  return (
    <>
      <div className={s.help}>
        {showLibrary ?
          <>Hjälp text välj bilder</>
          :
          <>Hjälp text redigera text</>
        }
      </div>
      <ul className={s.gallery}>
        {(showLibrary ? images : selected)?.map((img, idx) =>
          <li
            key={idx}
            className={cn(selected.find(el => el.id === img.id) && s.selected)}
            onClick={(e) => handleClick(e, img)}
          >
            <Image
              data={{ ...img.responsiveImage, sizes: undefined }}
              className={s.thumb}
              usePlaceholder={false}
              objectFit="contain"
              sizes="(min-width: 66em) 400px"
            />
            <div className={s.remove} onClick={(e) => handleRemove(e, img.id)}>×  </div>
          </li>
        )}
        <li className={s.upload}>
          {progress === undefined || progress === 100 && !uploading ?
            showLibrary ?
              <button type="button" onClick={() => uploadRef.current.click()}>
                Ladda upp
              </button>
              :
              <button type="button" onClick={() => onShowLibrary?.(true)}>
                Välj bild(er)
              </button>
            :
            <>
              {uploadImageData &&
                <div className={s.uploadImage}>
                  <img className={s.thumb} src={uploadImageData.src} />
                </div>
              }
              <Loader
                className={s.uploadLoader}
                color={'#ffffff'}
                message={progress === undefined ? 'Laddar upp...' : progress === 100 ? 'Sparar...' : progress + '%'}
              />
            </>
          }
        </li>
      </ul>
      {error &&
        <div className={s.error}>
          <div>{error.message}</div>
          <button type="button" onClick={handleRefresh}>Stäng</button>
        </div>
      }
      {uploadError &&
        <div className={s.error}>
          <div>{uploadError.message}</div>
          <button type="button" onClick={() => setUploadError(undefined)}>Stäng</button>
        </div>
      }
      {loading &&
        <div className={s.loading}>
          <Loader />
        </div>
      }
      <FileUpload
        ref={uploadRef}
        customData={{}}
        tags={[session.user.email, member.region.name, 'portfolio']}
        accept=".jpg,.png"
        onDone={handleUploadDone}
        onProgress={handleUploadProgress}
        onUploading={handleUploading}
        onError={handleUploadError}
        onImageData={handleUploadImageData}
        mediaLibrary={true}
      />
    </>
  )
}
