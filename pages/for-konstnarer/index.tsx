import s from './index.module.scss'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { AllMembersWithPortfolioDocument } from "/graphql";
import { apiQueryAll, isServer, recordToSlug } from "/lib/utils";
import Link from "next/link";

export type Props = {
  membersByRegion: MemberRecord[][]
  region: Region
}

export default function ForArtistsHome({ membersByRegion, region }: Props) {

  return (
    <div className={s.container}>
      <h1>Nuvarande medlemmar</h1>

      {membersByRegion.map((members, i) => {
        return (
          <>
            {membersByRegion.length > 1 &&
              <h2>{members[0].region.name}</h2>
            }
            <p key={i}>
              {members?.map((member, idx) =>
                <Link key={idx} href={recordToSlug(member)}>
                  {member.fullName}
                </Link>
              )}
            </p>
          </>
        )
      })}

    </div>
  );
}

ForArtistsHome.page = { crumbs: [{ slug: 'for-konstnarer', title: 'För konstnärer', regional: true }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const { region } = props
  console.log(region);

  const { members }: { members: MemberRecord[] } = await apiQueryAll(AllMembersWithPortfolioDocument, { variables: { regionId: region.global ? undefined : region.id } })
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