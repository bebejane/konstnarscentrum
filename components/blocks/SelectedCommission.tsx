import s from './SelectedCommission.module.scss'
import cn from 'classnames'
import React from 'react'
import ThumbnailContainer from '/components/common/ThumbnailContainer'
import Thumbnail from '/components/common/Thumbnail'

export type SelectedCommissionBlockProps = {
  data: SelectedCommissionRecord & {
    commissions: CommissionRecord[]
  }
}

export default function SelectedCommission({ data: { commissions } }: SelectedCommissionBlockProps) {

  return (
    <section className={s.container}>
      <div className={s.header}>
        <h2>Utvalda uppdrag</h2>
        <div>Visa alla</div>
      </div>
      <ThumbnailContainer>
        {commissions.map(({ title, image, slug }, idx) =>
          <Thumbnail
            key={idx}
            title={title}
            image={image}
            slug={`/anlita-oss/uppdrage/${slug}`}
          />
        )}
      </ThumbnailContainer>
      <div className={s.background}></div>
    </section>
  )
}