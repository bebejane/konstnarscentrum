import styles from "./[news].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { NewsDocument, AllNewsDocument } from "/graphql";
import { format } from "date-fns";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import { pagination } from "/lib/utils";

export type Props = {
  news: NewsRecord,
  region: Region
}

export default function News({ news: { createdAt, title, content, region } }: Props) {

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <h5>{format(new Date(createdAt), "d MMMM y")} &#8226; {region.name}</h5>
      <Markdown>{content}</Markdown>
    </div>
  );
}

export async function getStaticPaths() {
  return pagination.getStaticPaths(AllNewsDocument, 'news');
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.news;
  const { news } = await apiQuery(NewsDocument, { variables: { slug } })

  return {
    props: {
      ...props,
      news
    },
  };
});