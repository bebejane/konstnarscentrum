import s from './LatestMemberNews.module.scss'
import cn from 'classnames'
import React from 'react'

export type LatestMemberBlockProps = {
  data: LatestMemberNewsRecord
}

export default function LatestMemberNews({ data }: LatestMemberBlockProps) {

  return (
    <section>{data.__typename}</section>
  )
}