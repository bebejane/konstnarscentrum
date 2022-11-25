import s from './Text.module.scss'
import cn from 'classnames'
import React from 'react'
import Link from 'next/link';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
export type TextBlockProps = {
  data: TextRecord
}

export default function Text({ data: { text, headline, url } }: TextBlockProps) {

  return (
    <div className={s.container}>
      <Markdown className={s.text}>
        {text}
      </Markdown>
      <Link href={url}>Läs mer</Link>
    </div>
  )
}