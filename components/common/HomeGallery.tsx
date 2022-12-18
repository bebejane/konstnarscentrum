import s from './HomeGallery.module.scss'
import cn from 'classnames'
import { Image } from 'react-datocms'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { RevealText } from '/components'
import { SvgBlob } from 'react-svg-blob';
import blobshape from "blobshape";


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

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const slideTime = 6000

export default function HomeGallery({ slides }: Props) {

  const [index, setIndex] = useState(0)
  const [tIndex, setTIndex] = useState()
  const [loaded, setLoaded] = useState({})
  const [size, setSize] = useState({ width: 0, height: 0 })
  const ref = useRef<HTMLUListElement | null>(null)

  useEffect(() => {

    const interval = setInterval(() => {
      setIndex(index + 1 > slides.length - 1 ? 0 : index + 1)
    }, slideTime)

    return () => clearInterval(interval)
  }, [index, slides])

  useEffect(() => {
    if (ref.current === null) return
    setSize({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight
    })
  }, [ref])


  const currentImage = slides[index]?.image
  const nextImage = slides[index + 1 > slides.length - 1 ? 0 : index + 1]?.image


  return (
    <section className={s.gallery}>
      <ul ref={ref}>

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
                onLoad={() => setLoaded({ ...loaded, [id]: true })}
                objectFit="cover"
              />
              {index === idx &&
                <Transition
                  image={slides[idx + 1 > slides.length - 1 ? 0 : idx + 1]?.image}
                  size={size}
                  start={true}
                />
              }
            </Link>
          </li>
        )}

      </ul>

    </section >
  )
}


const Transition = ({ image, size, start }) => {

  const totalBlob = 300
  const [count, setCount] = useState(0)
  const [paths, setPaths] = useState([])

  useEffect(() => {
    const paths = new Array(totalBlob).fill(0).map((e, idx) => {
      const { path } = blobshape({
        size: randomInt(100, 400),
        growth: randomInt(2, 20),
        edges: randomInt(2, 20),
        seed: null
      })
      return (
        <path
          d={path}
          key={idx}
          transform={`translate(${randomInt(-200, size.width)},${randomInt(-200, size.height)})`}
        />
      )
    })
    setPaths(paths)
  }, [setPaths, size])

  useEffect(() => {
    if (!start)
      return setCount(0)

    let interval;

    const timeout = setTimeout(() => {
      let c = 0;
      interval = setInterval(() => {
        if (c > totalBlob)
          return clearInterval(interval)
        setCount(++c)
      }, 10)
    }, slideTime - 2000)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [start, image])


  return (
    <div className={s.color}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${size.width} ${size.height}`}>
        <defs>
          <clipPath id="mask">
            {paths.slice(0, count)}
          </clipPath>
        </defs>
      </svg>
      <Image
        className={s.maskImage}
        data={image.responsiveImage}
        lazyLoad={false}
        usePlaceholder={false}
        objectFit="cover"
        pictureStyle={{ clipPath: `url(#mask)` }}
      />
    </div>
  )
}