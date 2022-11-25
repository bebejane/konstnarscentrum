import s from './LatestNews.module.scss'
import cn from 'classnames'
import React from 'react'
import format from 'date-fns/format'
import Link from 'next/link'

export type LatestNewsBlockProps = {
  data: LatestNewsRecord & {
    news: NewsRecord[]
  }
}

export default function LatestNews({ data: { news } }: LatestNewsBlockProps) {
  //console.log(data);

  return (
    <section className={s.container}>
      <h2>Nyheter</h2>
      <ul>
        {news.map(({ id, region, intro, slug, title, createdAt }, idx) =>
          <li key={idx}>
            <h5>{format(new Date(createdAt), "d MMMM y")} &#8226; {region.name}</h5>
            <h2>{title}</h2>
            <p>{intro}</p>
            <Link href={'/'}>Läs mer</Link>
          </li>
        )}

      </ul>
    </section>
  )
}