import s from './Article.module.scss'
import React from 'react'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import { StructuredContent } from "/components";
import { Image } from 'react-datocms';

export type ArticleProps = {
  children?: React.ReactNode,
  title: string,
  text: string,
  image?: FileField,
  showImage?: boolean,
  content?: any
}

export default function Article({ children, title, text, image, content, showImage = true }: ArticleProps) {

  return (
    <div className={s.article}>
      {image && showImage ?
        <header>
          <h1 className={s.title}>{title}</h1>
          <Image
            className={s.image}
            data={image.responsiveImage}
          />
        </header>
        :
        <h1 className={s.title}> {title}</h1>
      }
      <Markdown className="intro">
        {text}
      </Markdown>
      {content &&
        <StructuredContent content={content} />
      }
      {children}
    </div>
  )
}