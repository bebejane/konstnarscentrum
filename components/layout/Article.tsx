import s from './Article.module.scss'
import React from 'react'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import { StructuredContent, Headline } from "/components";
import { Image } from 'react-datocms';
import { useScrollInfo } from 'dato-nextjs-utils/hooks';
import cn from 'classnames'
import BalanceText from 'react-balance-text'

export type ArticleProps = {
  children?: React.ReactNode,
  title: string,
  blackHeadline?: boolean,
  text: string,
  image?: FileField,
  showImage?: boolean,
  content?: any,
  editable?: any,
  noBottom?: boolean,
  onClick?: (id: string) => void

}

export default function Article({ children, title, blackHeadline = false, text, image, content, showImage = true, editable, noBottom, onClick }: ArticleProps) {

  const { scrolledPosition, viewportHeight } = useScrollInfo()
  const ratio = Math.max(0, Math.min((scrolledPosition) / viewportHeight, 1))

  return (
    <div className={cn(s.article, noBottom && s.noBottom, 'article')} >
      {image && showImage ?
        <header>
          <h1 className={cn(s.title, blackHeadline && s.black)}>
            <BalanceText>{title}</BalanceText>
          </h1>
          <figure data-editable={editable} onClick={() => onClick?.(image.id)}>
            <Image
              className={s.image}
              data={image.responsiveImage}
              fadeInDuration={0}
              objectFit="cover"
            />
          </figure>
          <div className={s.colorBg} style={{ backgroundColor: image.responsiveImage.bgColor }}></div>
        </header>
        :
        <h1> {title}</h1>
      }
      <Markdown className="intro">
        {text}
      </Markdown>
      {content &&
        <StructuredContent content={content} onClick={(imageId) => onClick?.(imageId)} />
      }
      {children}
    </div>
  )
}