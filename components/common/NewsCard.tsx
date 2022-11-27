import s from './NewsCard.module.scss'
import React from 'react'
import Link from 'next/link'
import { Image } from 'react-datocms'
import { Card } from '/components'

export type NewsCardProps = {
  title: string,
  subtitle: string,
  text: string,
  slug: string,
  regionName: string,
  image?: FileField
}

export default function NewsCard({ title, subtitle, text, slug, image }: NewsCardProps) {

  return (
    <Card className={s.card}>
      {image &&
        <Link href={slug}>
          <Image className={s.image} data={image.responsiveImage} />
        </Link>
      }
      <h5>{subtitle}</h5>
      <Link href={slug}><h4>{title}</h4></Link>
      <p className="mid">{text}</p>
      <Link className="small" href={slug}>Läs mer</Link>
    </Card>
  )
}