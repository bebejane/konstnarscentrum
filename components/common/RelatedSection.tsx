import s from './RelatedSection.module.scss'
import React from 'react'
import Link from 'next/link'
import { CardContainer, Card, Thumbnail, SectionHeader } from '/components'

export type RelatedSectionProps = {
  title: string,
  slug: string
  items: {
    title: string,
    image: FileField,
    slug: string
  }[]
}

export default function RelatedSection({ title, slug, items }: RelatedSectionProps) {

  return (
    <section className={s.related}>
      <SectionHeader title={title} slug={slug} />
      <div className={s.background}></div>
      <CardContainer columns={3}>
        {items.map(({ title, image, slug }, idx) =>
          <Card key={idx}>
            <Thumbnail
              image={image}
              title={title}
              slug={slug}
            />
          </Card>
        )}
      </CardContainer>
    </section>

  )
}