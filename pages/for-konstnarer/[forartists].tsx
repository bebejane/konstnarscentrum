import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllForArtistDocument, ForArtistDocument, AllMembersWithPortfolioDocument } from "/graphql";
import { Article } from "/components";
import { format } from "date-fns";
import { apiQueryAll, getStaticPagePaths } from "/lib/utils";

export type Props = {
  forArtist: ForArtistRecord
  members: MemberRecord[]
  region: Region
}

export default function ForArtists({ members, forArtist: { id, image, title, createdAt, content, intro }, region }: Props) {

  return (
    <>
      <Article
        id={id}
        image={image}
        text={intro}
        title={title}
        subtitle={`${format(new Date(createdAt), "d MMMM y")} • ${region.name}`}
        content={content}
      >
        <h1>Nuvarande medlemmar</h1>
        <ul>
          {members.map(({ fullName }, idx) =>
            <li key={idx}>{fullName}</li>
          )}
        </ul>
      </Article>
    </>
  );
}

ForArtists.page = { crumbs: [{ slug: 'for-konstnarer', title: 'För konstnärer', regional: false }] } as PageProps

export async function getStaticPaths() {
  return getStaticPagePaths(AllForArtistDocument, 'forartists')
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.forartists;

  const { members } = await apiQueryAll(AllMembersWithPortfolioDocument)
  const { forArtist } = await apiQuery(ForArtistDocument, { variables: { slug }, preview: context.preview })

  if (!forArtist)
    return { notFound: true }

  return {
    props: {
      ...props,
      forArtist,
      members,
      pageTitle: forArtist.title
    },
    revalidate
  };
});