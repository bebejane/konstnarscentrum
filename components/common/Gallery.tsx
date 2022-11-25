import s from './Gallery.module.scss'
import { Image } from 'react-datocms'
import Link from 'next/link'

export type Props = {
  slides: SlideRecord[]
}

export default function Gallery({ slides }: Props) {
  return (
    <section className={s.gallery}>
      <ul>
        {slides.map(({ id, headline, image, link }, idx) =>
          <li key={idx}>
            <Link href={'/'}>
              <>
                <header>
                  <h5>{'Type'}</h5>
                  <h2>{headline}</h2>
                </header>
                <Image className={s.image} data={image.responsiveImage} objectFit="cover" />
              </>
            </Link>
          </li>
        )}
      </ul>
    </section>
  )
}
