import s from './HomeGallery.module.scss'
import cn from 'classnames'
import { Image } from 'react-datocms'
import Link from 'next/link'
import { useState } from 'react'

export type Props = {
  slides: SlideRecord[]
}

const parseRecord = (record: any) => {
  if (!record)
    return { type: '', slug: '/' }
  const { __typename, slug } = record

  switch (__typename) {
    case 'CommissionRecord':
      return { type: 'Uppdrag', slug: `/anlita-oss/uppdrag/${slug}` }
    case 'MemberNewsRecord':
      return { type: 'Aktuellt', slug: `/konstnar/aktuellt/${slug}` }
    case 'NewsRecord':
      return { type: 'Nyheter', slug: `/nyheter/${slug}` }
    case 'ForArtistRecord':
      return { type: 'För konstnärer', slug: `/` }
    default:
      return { type: '', slug: '/' }
  }
}

export default function HomeGallery({ slides }: Props) {

  const [index, setIndex] = useState(0)

  return (
    <section className={s.gallery}>
      <ul>
        {slides.map(el => ({ ...el, ...parseRecord(el.link) })).map(({ id, headline, image, link, slug, type, blackText }, idx) =>
          <li
            key={idx}
            className={cn(idx === index ? s.transition : s.hide)}
            onAnimationEnd={() => setIndex(index + 1 > slides.length - 1 ? 0 : index + 1)}
          >
            <Link href={slug}>
              <header className={cn(blackText && s.blackText)}>
                <h5>{type}</h5>
                <h2>{headline}</h2>
              </header>
              <Image
                className={s.image}
                data={image.responsiveImage}
                objectFit="cover"
              />
            </Link>
          </li>
        )}
      </ul>
    </section>
  )
}
