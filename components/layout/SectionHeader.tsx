import s from './SectionHeader.module.scss'
import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

export type SectionHeaderProps = {
  title: string,
  slug?: string,
  margin?: boolean;
}

export default function SectionHeader({ title, slug, margin }: SectionHeaderProps) {
  return (
    <header className={cn(s.header, margin && s.minusMargin)}>
      <h2>{title}</h2>
      {slug &&
        <Link className="mid" href={slug}>Visa alla</Link>
      }
    </header>
  )
}