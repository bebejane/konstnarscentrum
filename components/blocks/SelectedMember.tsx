import s from './SelectedMember.module.scss'
import React from 'react'
import { CardContainer, Card, Thumbnail } from '/components'
import SectionHeader from '../layout/SectionHeader'

export type SelectedMemberBlockProps = {
  data: SelectedMemberRecord
}

export default function SelectedMember({ data: { selectedMembers } }: SelectedMemberBlockProps) {

  return (
    <section className={s.container}>
      <SectionHeader title="Upptäck konstnärer" slug={"/anlita-oss/uppdrag"} margin={true} />
      <CardContainer columns={3}>
        {selectedMembers?.map(({ firstName, lastName, image, slug }, idx) =>
          <Card key={idx}>
            <Thumbnail
              title={`${firstName} ${lastName}`}
              image={image}
              slug={`/anlita-oss/hitta-konstnar/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
      <div className={s.background}></div>
    </section>
  )
}