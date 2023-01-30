import s from './index.module.scss'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { AllMembersDocument, MembersListDocument } from "/graphql";
import { apiQueryAll, isServer, recordToSlug } from "/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { RevealText } from '/components';

export type Props = {
  membersByRegion: MemberRecord[][]
  region: Region
  membersList: MembersListRecord
}

export default function ForArtistsHome({ membersByRegion, membersList: { intro } }: Props) {

  return (
    <div className={s.container}>
      <h1>Medlemmar</h1>
      <p className="intro">{intro}</p>
      {membersByRegion.map((members, i) => {
        const region = members[0].region

        return (
          <React.Fragment key={i}>
            {membersByRegion.length > 1 &&
              <h3 key={`h${i}`}>{region.name}</h3>
            }
            <p className={s.members} key={i} id={region.id}>
              {members?.map((member, idx) =>
                member.image ?
                  <Link key={`${idx}-m`} href={recordToSlug(member)}>
                    {member.fullName}
                  </Link>
                  :
                  <span key={`${idx}-m`}>
                    {member.fullName}
                  </span>
              )}
            </p>
          </React.Fragment>
        )
      })}
    </div>
  );
}

ForArtistsHome.page = { regional: true, crumbs: [{ slug: 'for-konstnarer', title: 'För konstnärer' }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [MembersListDocument] }, async ({ props, revalidate, context }: any) => {

  const { region } = props
  const { members }: { members: MemberRecord[] } = await apiQueryAll(AllMembersDocument, { variables: { regionId: region.global ? undefined : region.id } })
  const membersByRegion: MemberRecord[][] = []

  members.sort((a, b) => a.region.position > b.region.position ? 1 : -1).forEach((m) => {
    !membersByRegion[m.region.position] && (membersByRegion[m.region.position] = [])
    membersByRegion[m.region.position].push(m)
    membersByRegion[m.region.position].sort((a, b) => a.firstName > b.firstName ? 1 : -1)
  })

  return {
    props: {
      ...props,
      membersByRegion: membersByRegion.filter(el => el)
    },
    revalidate
  };
});