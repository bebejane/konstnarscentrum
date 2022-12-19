import s from './BackgroundImage.module.scss'
import React from 'react'
import cn from 'classnames'

export type BackgroundImageProps = {
  image: string,
}

export default function BackgroundImage({ image }: BackgroundImageProps) {

  return (
    <div className={s.background}></div>
  )
}