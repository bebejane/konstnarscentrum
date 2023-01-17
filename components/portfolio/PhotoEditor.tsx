import s from "./PhotoBlockEditor.module.scss";
import { useEffect, useState } from "react";
import { KCImage as Image, PortfolioContent } from '/components'

export type Props = {
  image: FileField,
  onClose: () => void
  onChoose: () => void
  onBack: () => void
  onSave: (image: FileField) => void
}

export default function PhotoEditor({ image, onClose, onSave, onChoose, onBack }: Props) {

  const [title, setTitle] = useState<string | undefined>()
  const handleSave = () => {
    const newImage = { ...image, title: title }
    console.log(newImage);
    onSave(newImage)
  }
  useEffect(() => {
    setTitle(image.title)
    console.log('set title', image);

  }, [setTitle, image, image.title])

  console.log('title', title);
  if (!image) return null
  return (
    <PortfolioContent
      onClose={onClose}
      header={'Redigera bild'}
      save={'Spara'}
      onSave={handleSave}
      saveDisabled={false}
      onBack={onBack}
    >
      <div className={s.editor}>
        <div className={s.photo}>
          <figure>
            {image ?
              <Image
                data={image.responsiveImage}
                className={s.image}
                objectFit="contain"
                usePlaceholder={false}
              />
              :
              <button onClick={() => onChoose()}>Välj bild</button>
            }
          </figure>
        </div>
        <div className={s.meta}>
          <label className="small" htmlFor="description">
            Bildtext <span>Tips! Du kan kursivera titlar med *titel*.</span>
          </label>
          <input name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </div>
    </PortfolioContent>
  )
}
