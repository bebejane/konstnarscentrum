import s from './ImageShortcut.module.scss'
import React from 'react'
import { Image } from 'react-datocms'
import ReadMore from '../common/ReadMore'
import { recordToSlug } from '/lib/utils'

export type ImageShortcutBlockProps = {
  data: ImageShortcutRecord
}

export default function ImageShortcut({ data: { headline, image, link, text } }: ImageShortcutBlockProps) {

  return (
    <section className={s.container}>
      <figure>
        {image &&
          <Image
            className={s.image}
            data={image.responsiveImage}
            objectFit={'cover'}
          />
        }
        <figcaption>
          <div className={s.fade}></div>
          <h2>{headline}</h2>
          <p className="intro">{text}</p><br />
          <ReadMore link={link} message='Läs mer' invert={true} />
        </figcaption>
      </figure>
    </section >
  )
}