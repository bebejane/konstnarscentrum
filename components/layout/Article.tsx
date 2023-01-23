import s from './Article.module.scss'
import React from 'react'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import { StructuredContent, RevealText } from "/components";
import { KCImage as Image } from '/components'
import cn from 'classnames'
import BalanceText from 'react-balance-text'
import { useScrollInfo } from 'dato-nextjs-utils/hooks';

export type ArticleProps = {
  id: string,
  children?: React.ReactNode,
  title?: string,
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
  id,
  children,
  title,
  blackHeadline = false,
  text,
  image,
  content,
  showImage = true,
  editable,
  onClick,
}: ArticleProps) {

  const { scrolledPosition } = useScrollInfo()
  const hideCaption = scrolledPosition > 100;
  const haveImage = image?.responsiveImage !== undefined

  return (
    <div className={cn(s.article, 'article')}>
      {showImage &&
        <header>
          {title &&
            <h1 className={cn(s.title, haveImage && s.absolute, blackHeadline || !haveImage && s.black)}>
              <RevealText>
                <BalanceText>
                  {title}
                </BalanceText>
              </RevealText>
              {haveImage && <div className={s.fade}></div>}
            </h1>
          }

          <figure data-editable={editable} onClick={() => onClick?.(image.id)}>
            {haveImage ?
              <>
                <Image
                  className={s.image}
                  data={image.responsiveImage}
                  objectFit="cover"
                />
                <figcaption className={cn(hideCaption && s.hide)}>
                  <Markdown>{image.title}</Markdown>
                </figcaption>
              </>
              : editable ?
                <div className={s.emptyEditable}></div>
                : null
            }
          </figure>
          <div className={s.colorBg} style={{ backgroundColor: image?.responsiveImage.bgColor }}></div>
        </header>
      }
      {text &&
        <Markdown className="intro">
          {text}
        </Markdown>
      }
      {content &&
        <StructuredContent
          id={id}
          content={content}
          onClick={(imageId) => onClick?.(imageId)}
        />
      }
      {children}
    </div>
  )
}