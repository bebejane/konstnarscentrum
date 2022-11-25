import s from './LatestNews.module.scss'
import cn from 'classnames'
import React from 'react'

export type LatestNewsBlockProps = {
  data: LatestNewsRecord
}

export default function LatestNews({ data }: LatestNewsBlockProps) {

  return (
    <section>{data.__typename}</section>
  )
}