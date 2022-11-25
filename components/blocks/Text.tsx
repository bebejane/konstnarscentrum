import s from './Text.module.scss'
import React from 'react'
import Link from 'next/link';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type TextBlockProps = {
  data: TextRecord
}

export default function Text({ data: { text, headline, url } }: TextBlockProps) {

  return (
    <div className={s.container}>
      <h2>
        <Markdown className={s.text}>
          {text}
        </Markdown>
      </h2>
      <Link className="small" href={url}>Läs mer</Link>
    </div>
  )
}