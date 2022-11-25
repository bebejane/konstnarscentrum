import s from './ImageShortcut.module.scss'
import React from 'react'
import { Image } from 'react-datocms'
import Link from 'next/link'
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
          <h2>{headline}</h2>
          {text}<br />
          <Link href={recordToSlug(link)}>Läs mer</Link>
        </figcaption>
      </figure>
    </section>
  )
}