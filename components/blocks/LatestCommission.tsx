import s from './LatestCommission.module.scss'
import cn from 'classnames'
import React from 'react'

export type LatestCommissionBlockProps = {
  data: LatestCommissionRecord
}

export default function LatestCommission({ data }: LatestCommissionBlockProps) {

  return (
    <section>{data.__typename}</section>
  )
}