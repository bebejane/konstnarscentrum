import s from './SelectedMember.module.scss'
import React from 'react'
import ThumbnailContainer from '/components/common/ThumbnailContainer'
import Thumbnail from '/components/common/Thumbnail'
import SectionHeader from '../layout/SectionHeader'

export type SelectedMemberBlockProps = {
  data: SelectedMemberRecord
}

export default function SelectedMember({ data: { selectedMembers } }: SelectedMemberBlockProps) {

  return (
    <section className={s.container}>
      <SectionHeader title="Upptäck konstnärer" slug={"/anlita-oss/uppdrag"} margin={true} />
      <ThumbnailContainer>
        {selectedMembers?.map(({ firstName, lastName, image, slug }, idx) =>
          <Thumbnail
            key={idx}
            title={`${firstName} ${lastName}`}
            image={image}
            slug={`/anlita-oss/hitta-konstnar/${slug}`}
          />
        )}
      </ThumbnailContainer>
      <div className={s.background}></div>
    </section>
  )
}