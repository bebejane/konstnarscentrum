import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllNewsDocument } from "/graphql";
import { format } from "date-fns";
import { ReadMore, RevealText, Loader } from '/components'
import { pageSize } from "/lib/utils";
import Link from "next/link";
import BalanceText from 'react-balance-text'
import { useInView } from "react-intersection-observer";
import { useApiQuery } from "dato-nextjs-utils/hooks";
import { useEffect } from "react";

export type Props = {
  news: NewsRecord[],
  region?: Region,
  pagination: Pagination
}

export default function News({ news: newsFromProps, region, pagination }: Props) {

  const { inView, ref } = useInView({ triggerOnce: false })
  const { data: { news }, loading, error, nextPage, page } = useApiQuery<{ news: NewsRecord[] }>(AllNewsDocument, {
    initialData: { news: newsFromProps, pagination },
    variables: { first: pageSize, regionId: region.id },
    pageSize
  });

  useEffect(() => {
    if (inView && !page.end) nextPage()
  }, [inView, page, nextPage])

  return (
    <>
      <h1 className="noPadding"><RevealText>Nyheter</RevealText></h1>
      <div className={styles.container}>
        <ul>
          {news.length > 0 ? news.map(({ id, slug, title, intro, createdAt, region }, idx) =>
            <li key={id} >
              <Link href={`/${region.slug}/nyheter/${slug}`}>
                <h5>{format(new Date(createdAt), "d MMMM y")} &#8226; {region.name}</h5>
                <h3><BalanceText>{title}</BalanceText></h3>
                <p>{intro}</p>
              </Link>
              <ReadMore link={`/nyheter/${slug}`} regional={true} message='Läs mer' />
            </li>
          ) :
            <>Det finns inga nyheter...</>
          }
        </ul>
        <div ref={ref}>{loading && <Loader />}</div>
      </div>
    </>
  );
}

News.page = { title: 'Nyheter', regional: true, crumbs: [{ title: 'Nyheter' }] } as PageProps

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