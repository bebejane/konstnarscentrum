import s from './CardContainer.module.scss'
import cn from 'classnames'
import { chunkArray } from '/lib/utils'
import useDevice from '/lib/hooks/useDevice'
import React from 'react'

export type Props = {
  children?: React.ReactNode | React.ReactNode[],
  columns?: 2 | 3,
  className?: string
}

export default function CardContainer({ children, columns = 3, className }: Props) {

  const { isMobile } = useDevice()
  const cards = chunkArray(Array.isArray(children) ? children : [children], isMobile ? 1 : columns) as [React.ReactNode[]]

  return (
    <ul className={cn(s.container, columns === 2 && s.two, columns === 3 && s.three, className)}>
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