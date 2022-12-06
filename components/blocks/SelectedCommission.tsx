import s from './SelectedCommission.module.scss'
import cn from 'classnames'
import React from 'react'
import ThumbnailContainer from '/components/common/ThumbnailContainer'
import Thumbnail from '/components/common/Thumbnail'
import SectionHeader from '../layout/SectionHeader'
import { CardContainer, Card } from '/components'

export type SelectedCommissionBlockProps = {
  data: SelectedCommissionRecord & {
    commissions: CommissionRecord[]
  }
}

export default function SelectedCommission({ data: { commissions } }: SelectedCommissionBlockProps) {

  return (
    <section className={s.container}>
      <SectionHeader title="Utvalda uppdrag" slug="/anlita-oss/uppdrag" margin={true} />
      <CardContainer columns={3}>
        {commissions.map(({ year, city, image, slug }, idx) =>
          <Card key={idx}>
            <Thumbnail
              title={`${city} ${year}`}
              image={image}
              slug={`/anlita-oss/uppdrag/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
      <div className={s.background}></div>
    </section>
  )
}