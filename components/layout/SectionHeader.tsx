import s from './SectionHeader.module.scss'
import React from 'react'
import Link from 'next/link'

export type SectionHeaderProps = {
  title: string,
  slug?: string,
}

export default function SectionHeader({ title, slug }: SectionHeaderProps) {
  return (
    <header className={s.header}>
      <h2>{title}</h2>
      {slug &&
        <Link className="mid" href={slug}>Visa alla</Link>
      }
    </header>
  )
}