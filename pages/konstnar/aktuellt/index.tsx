import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { useApiQuery } from 'dato-nextjs-utils/hooks'
import { AllPresentMemberNewsDocument, AllPastMemberNewsDocument, AllMemberNewsCategoriesDocument } from "/graphql";
import { format } from "date-fns";
import { pageSize, apiQueryAll, memberNewsStatus, isServer } from "/lib/utils";
import { CardContainer, NewsCard, FilterBar, RevealText, Loader } from '/components'
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

export type MemberNewsRecordWithStatus = MemberNewsRecord & { status: { value: string, label: string } }
export type Props = {
	presentMemberNews: MemberNewsRecordWithStatus[],
	pastMemberNews: MemberNewsRecord[],
	memberNewsCategories: MemberNewsCategoryRecord[]
	date: string
	region?: Region,
	pagination: Pagination
}

export default function MemberNews({ presentMemberNews, pastMemberNews: pastMemberNewsFromProps, memberNewsCategories, date, pagination }: Props) {

	const router = useRouter()
	const [memberNewsCategoryIds, setMemberNewsCategoryIds] = useState<string | string[] | undefined>()
	const { data: { pastMemberNews }, loading, error, nextPage, loadMore, page } = useApiQuery<{ pastMemberNews: MemberNewsRecord[] }>(AllPastMemberNewsDocument, {
		initialData: { pastMemberNews: pastMemberNewsFromProps, pagination },
		variables: { first: pageSize, date },
		pageSize
	});

	const { inView, ref } = useInView({ triggerOnce: true })

	useEffect(() => {
		if (inView && !page.end && !loading)
			nextPage()
	}, [inView, page, loading, nextPage])

	useEffect(() => {
		console.log(memberNewsCategoryIds);
		router.replace(`${document.location.pathname}?categories=${memberNewsCategoryIds?.join(',')}`)
		console.log(`${document.location.pathname}?categories=${memberNewsCategoryIds?.join(',')}`)
	}, [memberNewsCategoryIds])

	return (
		<>
			<h1><RevealText>Aktuellt för medlemmar</RevealText></h1>

			<FilterBar
				multi={true}
				options={memberNewsCategories.map(({ id, category }) => ({ label: category, id }))}
				onChange={(ids) => setMemberNewsCategoryIds(ids)}
			/>

			<CardContainer columns={2} className={s.memberNews} key={page.no}>
				{presentMemberNews.concat(pastMemberNews).map((el, idx) => {
					const { id, date, title, intro, slug, region, image, category, status } = el
					return (
						<NewsCard
							key={id}
							title={title}
							subtitle={`${category.category} • ${format(new Date(date), "d MMM").replace('.', '')} • ${region.name}`}
							label={memberNewsStatus(el).label}
							text={intro}
							image={image}
							slug={`/${region.slug}/konstnar/aktuellt/${slug}`}
							regionName={region.name}
						/>
					)
				})}
			</CardContainer>
			{!page.end && <div ref={ref} key={`page-${page.no}`}>{loading && <Loader />}</div>}
			{error && <div className={s.error}><>Error: {error.message || error}</></div>}
		</>
	);
}

MemberNews.page = { title: 'Aktuellt', crumbs: [{ title: 'Aktuellt' }], regional: true } as PageProps

export const getServerSideProps: GetServerSideProps = withGlobalProps({ queries: [AllMemberNewsCategoriesDocument] }, async ({ props, revalidate, context }: any) => {

	const newsCategories = context.params?.categories?.split(',')
	const page = parseInt(context.params?.page) || 1;
	const isFirstPage = page === 1
	const regionId = props.region.global ? undefined : props.region.id;
	const date = format(new Date(), 'yyyy-MM-dd')

	let { presentMemberNews } = await apiQuery(AllPresentMemberNewsDocument, { variables: { regionId, date } });
	let { pastMemberNews, pagination } = await apiQueryAll(AllPastMemberNewsDocument, { variables: { regionId, date } });

	let start = (isFirstPage ? 0 : (page - 1) * pageSize)
	let end = isFirstPage ? pageSize : ((pageSize * (page)))

	pastMemberNews = pastMemberNews
		.map(el => ({ ...el, status: memberNewsStatus(el) }))
		.slice(start, end)

	presentMemberNews = presentMemberNews
		.map(el => ({ ...el, status: memberNewsStatus(el) }))
		.sort((a, b) => a.status.order > b.status.order ? -1 : 1)

	if (!pastMemberNews.length && !presentMemberNews.length)
		return { notFound: true }

	return {
		props: {
			...props,
			presentMemberNews,
			pastMemberNews,
			date,
			pagination: { ...pagination, page, size: pageSize }
		},
		revalidate
	};
});