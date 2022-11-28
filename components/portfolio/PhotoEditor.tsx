import s from "./PhotoEditor.module.scss";
import cn from 'classnames'
import { useEffect, useState } from "react";
import { Image } from "react-datocms";

export type Props = {
  images?: FileField[],
  onClose: () => void,
  onSave: (image: any) => void,
}


export default function PhotoEditor({ images, onClose, onSave }: Props) {

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
          <header>Redigera</header>
          <button type="button" onClick={onClose}>Stäng</button>
        </div>
        <div className={cn(s.content, image && s.showEditor)}>
          <ul className={s.gallery}>
            {images?.map((img, idx) =>
              <li key={idx} onClick={() => setImage(img)}>
                <Image
                  data={img.responsiveImage}
                  className={s.thumb}
                  usePlaceholder={false}
                  objectFit="contain"
                />
              </li>
            )}
          </ul>
          <div className={s.editor}>
            <div className={s.photo}>
              <label>Bild</label>
              <figure>
                {image &&
                  <Image data={image.responsiveImage} className={s.image} usePlaceholder={false} />
                }
                <button type="button">Byt bild</button>
              </figure>
            </div>
            <div className={s.meta}>
              <label htmlFor="title">Title</label>
              <input name="title" type="text" />
              <label htmlFor="year">Årtal</label>
              <input name="year" type="text" />
              <label htmlFor="description">Beskrivning</label>
              <input name="description" type="text" />
            </div>
          </div>
        </div>
        <div className={cn(s.bar, s.bottom)}>
          <header>
            {image && images.length > 1 &&
              <button type="button" onClick={() => setImage(undefined)}>
                Galleri
              </button>
            }
          </header>
          <div className={s.buttons}>
            <button type="button" onClick={onSave}>Spara</button>
            <button type="button" onClick={handleReset}>Släng</button>
          </div>
        </div>
      </form>
    </div>
  )
}
