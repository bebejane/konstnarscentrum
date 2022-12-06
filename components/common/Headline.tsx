import s from './Card.module.scss'
import cn from 'classnames'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { logMissingFieldErrors } from '@apollo/client/core/ObservableQuery'
import { useWindowSize } from 'rooks'

export type HeadlineProps = {
  children: React.ReactNode,
  className?: string
  size?: number
}

export default function Headline({ children, className, size = 1 }: HeadlineProps) {
  //children = 'hej hag ar en lang text'

  const text = (children as string);
  const ref = useRef<HTMLHeadingElement | null>(null)
  const { innerWidth, innerHeight } = useWindowSize()
  const [words, setWords] = useState<string[] | undefined>(text?.split(' '))
  //const Header = (size === 1 ? <h1 /> : <h2 />) as React.ElementType
  useEffect(() => {
    if (ref.current === null)
      return

    const styles = getComputedStyle(ref.current)
    const height = parseInt(styles.height) - parseInt(styles.paddingTop) - parseInt(styles.paddingBottom)
    const lineHeight = parseInt(styles.lineHeight)
    const rows = Math.floor(height / lineHeight)
    //setRows([])

  }, [ref, innerHeight, innerWidth])

  return (
    <h1 className={cn(s.hedline, className)} ref={ref}>
      {words?.join(' ')}
    </h1>
  )
}