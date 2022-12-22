import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { NewsDocument, AllNewsDocument } from "/graphql";
import { Article, RegionLink } from "/components";
import { format } from "date-fns";
import { getStaticPagePaths } from "/lib/utils";

export type Props = {
  news: NewsRecord
}

export default function NewsItem({ news: { createdAt, title, image, intro, content, region, blackHeadline } }: Props) {

  return (
    <>
      <Article
        id={id}
        image={image}
        title={title}
        subtitle={`${format(new Date(createdAt), "d MMMM y")} • ${region.name}`}
        blackHeadline={blackHeadline}
        text={intro}
        content={content}
      />
      <RegionLink href={'/nyheter'}>
        <button className="wide">Visa alla nyheter</button>
      </RegionLink>
    </>
  );
}

NewsItem.page = { crumbs: [{ slug: 'nyheter', title: 'Nyheter', regional: true }] } as PageProps

export async function getStaticPaths() {
  return getStaticPagePaths(AllNewsDocument, 'news')
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.news;
  const { news } = await apiQuery(NewsDocument, { variables: { slug }, preview: context.preview })

  if (!news)
    return { notFound: true }

  return {
    props: {
      ...props,
      news,
      pageTitle: news.title
    },
    revalidate
  };
});