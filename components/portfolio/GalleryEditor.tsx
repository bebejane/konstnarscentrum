import s from "./GalleryEditor.module.scss";
import cn from 'classnames'
import { useEffect, useState } from "react";
import { KCImage as Image } from '/components'

export type Props = {
  images?: FileField[],
  onSelect: (image: FileField) => void,
}

export default function GalleryEditor({ images, onSelect }: Props) {

  return (
    <ul className={s.gallery}>
      {images?.map((img, idx) =>
        <li key={idx} onClick={() => onSelect(img)}>
          <Image
            data={img.responsiveImage}
            className={s.thumb}
            usePlaceholder={false}
            objectFit="contain"
          />
        </li>
      )}
    </ul>
  )
}
