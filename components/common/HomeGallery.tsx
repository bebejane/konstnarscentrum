import s from './HomeGallery.module.scss'
import cn from 'classnames'
import { Image } from 'react-datocms'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RevealText } from '/components'

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

  useEffect(() => {

    const interval = setInterval(() => {
      setIndex(index + 1 > slides.length - 1 ? 0 : index + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [index, slides])

  return (
    <section className={s.gallery}>
      <ul>
        {slides.map(el => ({ ...el, ...parseRecord(el.link) })).map(({ id, headline, image, link, slug, type, blackText }, idx) =>
          <li
            key={idx}
            className={cn(idx === index ? s.transition : s.hide)}
          >
            <Link href={slug}>
              <header className={cn(blackText && s.blackText)}>
                <h5>{type}</h5>
                <h2><RevealText start={index === idx}>{headline}</RevealText></h2>
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
