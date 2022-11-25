import s from './NewsCard.module.scss'
import cn from 'classnames'
import React from 'react'

import Link from 'next/link'
import { Image } from 'react-datocms'

export type NewsCardProps = {
  title: string,
  subtitle: string,
  text: string,
  slug: string,
  regionName: string,
  image?: FileField
}

export default function NewsCard({ title, subtitle, text, slug, image, regionName }: NewsCardProps) {

  return (
    <div className={s.card}>
      {image &&
        <Image className={s.image} data={image.responsiveImage} />
      }
      <h5>{subtitle}</h5>
      <h2>{title}</h2>
      <p className="mid">{text}</p>
      <Link href={slug}>Läs mer</Link>
    </div>
  )
}