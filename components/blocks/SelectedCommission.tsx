import s from './SelectedCommission.module.scss'
import cn from 'classnames'
import React from 'react'
import ThumbnailContainer from '/components/common/ThumbnailContainer'
import Thumbnail from '/components/common/Thumbnail'
import SectionHeader from '../layout/SectionHeader'

export type SelectedCommissionBlockProps = {
  data: SelectedCommissionRecord & {
    commissions: CommissionRecord[]
  }
}

export default function SelectedCommission({ data: { commissions } }: SelectedCommissionBlockProps) {

  return (
    <section className={s.container}>
      <SectionHeader title="Utvalda uppdrag" slug="/anlita-oss/uppdrag" />
      <ThumbnailContainer>
        {commissions.map(({ title, image, slug }, idx) =>
          <Thumbnail
            key={idx}
            title={title}
            image={image}
            slug={`/anlita-oss/uppdrag/${slug}`}
          />
        )}
      </ThumbnailContainer>
      <div className={s.background}></div>
    </section>
  )
}