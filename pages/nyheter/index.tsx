import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllNewsDocument } from "/graphql";
import { format } from "date-fns";
import { Pager } from '/components'
import { pageSize } from "/lib/utils";
import Link from "next/link";
import BalanceText from 'react-balance-text'

//const pageSize = 2;

export type Props = {
  news: NewsRecord[],
  region?: Region,
  pagination: Pagination
}

export default function News({ news, region, pagination }: Props) {

  return (
    <>
      <h1 className="noPadding">Nyheter</h1>
      <div className={styles.container}>
        <ul>
          {news.length ? news.map(({ slug, title, intro, createdAt, region }, idx) =>
            <li key={idx} >
              <Link href={region ? `/${region.slug}/nyheter/${slug}` : `/nyheter/${slug}`}>
                <h5>{format(new Date(createdAt), "d MMMM y")} &#8226; {region.name}</h5>
                <h3><BalanceText>{title}</BalanceText></h3>
                <p>{intro}</p>
              </Link>
            </li>
          ) :
            <>Det finns inga nyheter...</>
          }
        </ul>
        <Pager pagination={pagination} slug={'/nyheter'} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const page = parseInt(context.params?.page) || 1;
  const regionId = props.region.global ? undefined : props.region.id;
  const { news, pagination } = await apiQuery(AllNewsDocument, {
    variables: {
      regionId,
      first: pageSize,
      skip: (pageSize * (page - 1))
    }
  });

  return {
    props: {
      ...props,
      news,
      pagination: {
        ...pagination,
        page,
        size: pageSize
      }
    },
    revalidate
  };
});