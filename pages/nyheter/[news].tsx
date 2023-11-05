import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { NewsDocument, AllNewsDocument } from "/graphql";
import { Article, RegionLink } from "/components";
import { format } from "date-fns";
import { getStaticPagePaths } from "/lib/utils";
import { DatoSEO } from "dato-nextjs-utils/components";

export type Props = {
  news: NewsRecord
}

export default function NewsItem({ news: { id, createdAt, title, image, intro, content, region, blackHeadline, _seoMetaTags } }: Props) {

  return (
    <>
      <DatoSEO title={title} description={intro} seo={_seoMetaTags} />
      <Article
        id={id}
        image={image}
        title={title}
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

NewsItem.page = { crumbs: [{ slug: 'nyheter', title: 'Nyheter' }], regional: true } as PageProps

export async function getStaticPaths() {
  return getStaticPagePaths(AllNewsDocument, 'news')
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.news;
  const { news } = await apiQuery(NewsDocument, { variables: { slug }, preview: context.preview })

  if (!news)
    return { notFound: true, revalidate }

  return {
    props: {
      ...props,
      news,
      pageTitle: news.title
    },
    revalidate
  };
});