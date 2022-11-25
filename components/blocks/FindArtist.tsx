import s from './FindArtist.module.scss'
import cn from 'classnames'
import React from 'react'

export type FindArtistBlockProps = {
  data: FindArtistRecord
}

export default function FindArtist({ data }: FindArtistBlockProps) {

  return (
    <section>{data.__typename}</section>
  )
}