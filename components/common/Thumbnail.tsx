import s from './Thumbnail.module.scss'
import cn from 'classnames'
import { RegionLink } from '/components'
import { KCImage as Image } from '/components'
import { useEffect, useState, useRef } from 'react'
import useDevice from '/lib/hooks/useDevice'

export type Props = {
  image: FileField,
  slug: string,
  title: string,
  subtitle?: string,
  regional?: boolean
}

const speed = 0.07


export default function Thumbnail({ image, slug, title, subtitle, regional = true }: Props) {

  const [hover, setHover] = useState<undefined | boolean>();
  const [ratio, setRatio] = useState<number>(0)
  const { isDesktop } = useDevice()
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
      regional={regional}
      onMouseOver={() => isDesktop && setHover(true)}
      onMouseLeave={() => isDesktop && setHover(false)}
    >
      {image &&
        <Image
          data={image.responsiveImage}
          className={s.image}
          pictureClassName={cn(s.picture, hover && s.hover)}
          pictureStyle={{ left: hover ? '1.9rem' : 0 }}
        />
      }
      <div className={cn('mid', s.title, s.vertical)}>
        <span>
          {vertical.map(c => c)}</span>
        <div className={s.fade}>

        </div>
      </div>
      <span className={cn('mid', s.title, s.horizontal)}>
        <span className={s.first}>{horizontal.map(c => c)}</span>
        <span className={cn('mid', s.more, hover && s.hover)}>
          {more.map(c => c)}
        </span>
      </span>
    </RegionLink>
  )
}