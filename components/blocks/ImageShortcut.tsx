import s from './ImageShortcut.module.scss'
import cn from 'classnames'
import React from 'react'

export type ImageShortcutBlockProps = {
  data: ImageShortcutRecord
}

export default function ImageShortcut({ data }: ImageShortcutBlockProps) {

  return (
    <section>{data.__typename}</section>
  )
}