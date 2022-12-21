import s from './CardContainer.module.scss'
import cn from 'classnames'
import { chunkArray } from '/lib/utils'
import useDevice from '/lib/hooks/useDevice'
import React, { useEffect, useState } from 'react'

export type Props = {
  children?: React.ReactNode | React.ReactNode[],
  columns?: 2 | 3,
  className?: string
  whiteBorder: boolean
}

export default function CardContainer({ children, columns = 3, className, whiteBorder }: Props) {

  const buildCards = () => {
    return chunkArray(Array.isArray(children) ? children : [children], columns) as [React.ReactNode[]]
  }

  const [cards, setCards] = useState(buildCards())

  return (
    <ul className={cn(s.container, columns === 2 && s.two, columns === 3 && s.three, className, whiteBorder && s.whiteBorder)}>
      {cards.map((row, idx) => {
        return (
          <React.Fragment key={idx}>
            {row.map(el => el)}
            <hr key={idx} />
          </React.Fragment>
        )
      })}
    </ul>
  )
}