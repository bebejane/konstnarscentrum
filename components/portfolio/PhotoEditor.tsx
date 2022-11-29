import s from "./PhotoEditor.module.scss";
import cn from 'classnames'
import { useEffect, useState } from "react";
import { Image } from "react-datocms";
import { GalleryEditor } from "/components";

export type Props = {
  image: FileField
}

export default function PhotoEditor({ image }: Props) {

  const [title, setTitle] = useState<string | undefined>(image.title)

  return (
    <div className={s.editor}>
      <div className={s.photo}>
        <figure>
          {image &&
            <Image
              data={image.responsiveImage}
              className={s.image}
              objectFit="contain"
              usePlaceholder={false}
            />
          }
          <button type="button">Byt bild</button>
        </figure>
      </div>
      <div className={s.meta}>
        <label className="small" htmlFor="description">Bildtext <span>Tips! Du kan kursivera titlar med *titel*.</span></label>
        <input name="description" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
    </div>
  )
}
