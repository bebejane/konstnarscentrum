import s from './ThumbnailContainer.module.scss'
import { chunkArray } from '/lib/utils'
import useDevice from '/lib/hooks/useDevice'
import React from 'react'

export type Props = {
  children?: React.ReactNode | React.ReactNode[]
}

export default function ThumbnailContainer({ children }: Props) {
  const { isMobile } = useDevice()
  const thumbs = chunkArray(Array.isArray(children) ? children : [children], isMobile ? 2 : 3) as [React.ReactNode[]]

  return (
    <div className={s.container}>
      {thumbs.map((row, idx) => {
        return (
          <React.Fragment key={idx}>
            {row.map((el) => el)}
            <hr />
          </React.Fragment>
        )
      })}
    </div>
  )
}