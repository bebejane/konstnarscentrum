import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllNewsDocument } from "/graphql";
import { format } from "date-fns";
import { Pager, ReadMore, RevealText } from '/components'
import { pageSize } from "/lib/utils";
import Link from "next/link";
import BalanceText from 'react-balance-text'

export type Props = {
  news: NewsRecord[],
  region?: Region,
  pagination: Pagination
}

export default function News({ news, region, pagination }: Props) {

  return (
    <>
      <h1 className="noPadding"><RevealText>Nyheter</RevealText></h1>
      <div className={styles.container}>
        <ul>
          {news.length > 0 ? news.map(({ slug, title, intro, createdAt, region }, idx) =>
            <li key={idx} >
              <Link href={`/${region.slug}/nyheter/${slug}`}>
                <h5>{format(new Date(createdAt), "d MMMM y")} &#8226; {region.name}</h5>
                <h3><BalanceText>{title}</BalanceText></h3>
                <p>{intro}</p>
              </Link>
              <ReadMore link={`/${region.slug}/nyheter/${slug}`} message='Läs mer' />
            </li>
          ) :
            <>Det finns inga nyheter...</>
          }
        </ul>
        <Pager pagination={pagination} slug={`/${region.slug}/nyheter`} />
      </div>
    </>
  );
}

News.page = { crumbs: [{ title: 'Nyheter', regional: true }] } as PageProps

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