import s from './Text.module.scss'
import cn from 'classnames'
import React from 'react'
import Link from 'next/link';

export type LatestMemberBlockProps = {
  data: LatestMemberNewsRecord
}

export default function Text({ data: { text } }) {

  return (
    <div className={s.text}>

    </div>

  )
}