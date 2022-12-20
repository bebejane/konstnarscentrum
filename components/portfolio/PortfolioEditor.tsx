import s from "./PortfolioEditor.module.scss";
import cn from 'classnames'
import { useEffect, useState } from "react";
import { KCImage as Image } from '/components'
import { GalleryEditor, PhotoEditor } from "/components";

export type Props = {
  images?: FileField[],
  onClose: () => void,
  onSave: (image: FileField) => void,
}


export default function PortfolioEditor({ images, onClose, onSave }: Props) {

  const [image, setImage] = useState<FileField | undefined>()

  const handleReset = () => {

  }
  useEffect(() => {
    if (images?.length === 1)
      setImage(images[0])
  }, [])


  return (
    <div id="edit-photo" className={cn(s.photoEditor)}>
      <form>
        <div className={cn(s.bar, s.top)}>
          <header><span>Redigera</span></header>
          <button type="button" onClick={onClose}>Stäng</button>
        </div>
        <div className={cn(s.content, image && s.showEditor)}>
          {!image ?
            <GalleryEditor images={images} onSelect={(image) => setImage(image)} />
            :
            <PhotoEditor image={image} />
          }
        </div>
        <div className={cn(s.bar, s.bottom)}>
          <header>
            {image &&
              <button type="button" onClick={() => setImage(undefined)}>Tillbaka</button>
            }
          </header>
          <button type="button" onClick={onClose}>Spara</button>
        </div>
      </form>
    </div>
  )
}
