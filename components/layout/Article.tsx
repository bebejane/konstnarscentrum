import s from './Article.module.scss'
import React from 'react'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import { StructuredContent } from "/components";
import { Image } from 'react-datocms';

export type ArticleProps = {
  children: React.ReactNode,
  title: string,
  text: string,
  image?: FileField,
  content?: any
}

export default function Article({ children, title, text, image, content }: ArticleProps) {

  return (
    <article className={s.article}>
      {image &&
        <header>
          <h1>{title}</h1>
          <Image data={image.responsiveImage} />
        </header>
      }
      {!image &&
        < h1 > {title}</h1>
      }
      <Markdown className="intro">
        {text}
      </Markdown>

      {content &&
        <StructuredContent content={content} />
      }
      {children}
    </article>
  )
}