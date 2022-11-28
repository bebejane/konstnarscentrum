import s from "./PhotoEditor.module.scss";
import cn from 'classnames'
import { useEffect, useState } from "react";
import { Image } from "react-datocms";
import { GalleryEditor } from "/components";

export type Props = {
  image: FileField
}

export default function PhotoEditor({ image }: Props) {

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
        <label htmlFor="description">Beskrivning</label>
        <input name="description" type="text" />
      </div>
    </div>
  )
}
