import s from './Article.module.scss'
import React from 'react'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import { StructuredContent } from "/components";
import { Image } from 'react-datocms';
import { useScrollInfo } from 'dato-nextjs-utils/hooks';

export type ArticleProps = {
  children?: React.ReactNode,
  title: string,
  text: string,
  image?: FileField,
  showImage?: boolean,
  content?: any
}

export default function Article({ children, title, text, image, content, showImage = true }: ArticleProps) {

  const { scrolledPosition, viewportHeight } = useScrollInfo()
  const ratio = Math.max(0, Math.min((scrolledPosition) / viewportHeight, 1))
  const startScrollAnimation = ratio > 0.1

  return (
    <div className={s.article}>
      {image && showImage ?
        <header>
          <h1 className={s.title}>{title}</h1>
          <Image
            className={s.image}
            data={image.responsiveImage}
            fadeInDuration={!startScrollAnimation ? 1000 : 0}
            placeholderStyle={startScrollAnimation ? { opacity: ratio } : {}}
            pictureStyle={startScrollAnimation ? { opacity: (1 - ratio) } : {}}
            objectFit="cover"
          />
          <div className={s.colorBg} style={{ backgroundColor: image.responsiveImage.bgColor }}></div>
        </header>
        :
        <h1> {title}</h1>
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