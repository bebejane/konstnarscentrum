import s from './Article.module.scss'
import React from 'react'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import { StructuredContent, RevealText } from "/components";
import { Image } from 'react-datocms';
import cn from 'classnames'
import BalanceText from 'react-balance-text'

export type ArticleProps = {
  children?: React.ReactNode,
  title: string,
  subtitle?: string,
  blackHeadline?: boolean,
  text?: string,
  image?: FileField,
  showImage?: boolean,
  content?: any,
  editable?: any,
  noBottom?: boolean,
  onClick?: (id: string) => void

}

export default function Article({
  children,
  title,
  subtitle,
  blackHeadline = false,
  text,
  image,
  content,
  showImage = true,
  editable,
  onClick
}: ArticleProps) {

  return (
    <div className={cn(s.article, 'article')} >
      {image && showImage ?
        <header>
          <h1 className={cn(s.title, blackHeadline && s.black)}>
            <BalanceText>
              <RevealText>{title}</RevealText>
            </BalanceText>
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
        <h1>
          <RevealText>{title}</RevealText>
        </h1>
      }
      {text &&
        <Markdown className="intro">
          {text}
        </Markdown>
      }
      {content &&
        <StructuredContent
          content={content}
          onClick={(imageId) => onClick?.(imageId)}
        />
      }
      {children}
    </div>
  )
}