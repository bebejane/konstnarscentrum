import s from './Headline.module.scss'
import cn from 'classnames'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'rooks'

export type HeadlineProps = {
  children: React.ReactNode,
  trailing: number
  className?: string
  headlineSize?: 1 | 2 | 3 | 4 | 5 | 6
}

export default function Headline({ children, className, headlineSize = 1, trailing = 2 }: HeadlineProps) {
  //children = 'hej hag ar en lang text ett tva tre fyra'

  const text = (children as string);
  const ref = useRef<HTMLHeadingElement | null>(null)
  const { innerWidth, innerHeight } = useWindowSize()
  const [words, setWords] = useState<string[] | undefined>(text?.split(' '))
  const [rows, setRows] = useState<number>(1)

  const calculateRows = () => {
    if (ref.current === null) return

    const styles = getComputedStyle(ref.current)
    const height = parseInt(styles.height) - parseInt(styles.paddingTop) - parseInt(styles.paddingBottom)
    const lineHeight = parseInt(styles.lineHeight)
    const rows = Math.floor(height / lineHeight)
    console.log(height, lineHeight, rows)


    setRows(rows)
  }
  useEffect(() => {
    calculateRows()
  }, [ref])

  useEffect(() => {
    setRows(1)
    setTimeout(() => calculateRows(), 100)

  }, [ref, innerHeight, innerWidth])


  const props = { className: cn(s.hedline, className), ref }
  const breakWord = rows === 2 ? words.length - (trailing + 1) : -1
  const content = words?.map((word, idx) =>
    <>
      {word}{idx !== breakWord ? ' ' : <br />}
    </>
  )

  return (
    <>
      {(() => {
        switch (headlineSize) {
          case 1:
            return <h1 {...props}>{content}</h1>
          case 2:
            return <h2 {...props}>{content}</h2>
          case 3:
            return <h3 {...props}>{content}</h3>
          case 4:
            return <h4 {...props}>{content}</h4>
          case 5:
            return <h5 {...props}>{content}</h5>
          case 6:
            return <h6 {...props}>{content}</h6>
        }
      })()}
    </>
  )
}