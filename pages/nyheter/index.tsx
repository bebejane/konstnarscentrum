import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllNewsDocument } from "/graphql";
import { format } from "date-fns";


import Link from "next/link";

export type Props = {
  news: NewsRecord[],
  region?: Region
}

export default function News({ news, region }: Props) {

  return (
    <>
      <h1 className="noPadding">Nyheter</h1>
      <div className={styles.container}>
        <ul>
          {news.length ? news.map(({ slug, title, intro, createdAt, region }, idx) =>
            <li key={idx} >
              <Link href={region ? `/${region.slug}/nyheter/${slug}` : `/nyheter/${slug}`}>
                <h5>{format(new Date(createdAt), "d MMMM y")} &#8226; {region.name}</h5>
                <h2>{title}</h2>
                <p>{intro}</p>
              </Link>
            </li>
          ) :
            <>Inga nyheter...</>
          }
        </ul>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const { news } = await apiQuery(AllNewsDocument, { variables: { id: props.region?.id } });

  return {
    props: {
      ...props,
      news
    },
    revalidate
  };
});