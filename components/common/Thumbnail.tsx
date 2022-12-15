import s from './Thumbnail.module.scss'
import cn from 'classnames'
import { RegionLink } from '/components'
import { Image } from 'react-datocms'
import { useEffect, useState, useRef } from 'react'
import useDevice from '/lib/hooks/useDevice'

export type Props = {
  image: FileField,
  slug: string,
  title: string,
  subtitle?: string
}

const speed = 0.07


export default function Thumbnail({ image, slug, title, subtitle }: Props) {

  const [hover, setHover] = useState<undefined | boolean>();
  const [ratio, setRatio] = useState<number>(0)
  const { isMobile } = useDevice()
  const horizontal = title.split('').slice((title.length * ratio))
  const vertical = title.split('').slice(title.length - (title.length * ratio))
  const readMore = subtitle || 'Visa'
  const more = readMore.split('').slice(readMore.length - (readMore.length * ratio))
  const interval = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    if (typeof hover === 'undefined')
      return

    let r = ratio;
    interval.current = setInterval(() => {
      r += hover ? speed : -speed
      setRatio(Math.min(Math.max(r, 0), 1))
      if (r >= 1 || r <= 0)
        clearInterval(interval.current)
    }, 10)

    return () => clearInterval(interval.current)

  }, [hover, setRatio])

  return (
    <RegionLink
      className={s.thumbnail}
      href={slug}
      onMouseOver={() => !isMobile && setHover(true)}
      onMouseLeave={() => !isMobile && setHover(false)}
    >
      {image &&
        <Image
          data={image.responsiveImage}
          className={s.image}
          pictureClassName={cn(s.picture, hover && s.hover)}
          pictureStyle={{ left: hover ? '1.9rem' : 0 }}
          fadeInDuration={0}
        />
      }

      <div className={cn('mid', s.title, s.vertical)}>
        {vertical.map(c => c)}
      </div>
      <span className={cn('mid', s.title, s.horizontal)}>
        <span>{horizontal.map(c => c)}</span>
        <span className={cn('mid', s.more, hover && s.hover)}>
          {more.map(c => c)}
        </span>
      </span>

    </RegionLink>
  )
}