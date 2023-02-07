import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { useApiQuery } from "dato-nextjs-utils/hooks";
//import useApiQuery from "/lib/hooks/useApiQuery";
import { AllPresentMemberNewsDocument, AllPastAndFutureMemberNewsDocument, AllMemberNewsCategoriesDocument } from "/graphql";
import { format } from "date-fns";
import { pageSize, apiQueryAll, memberNewsStatus, isServer } from "/lib/utils";
import { CardContainer, NewsCard, FilterBar, RevealText, Loader } from '/components'
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export type MemberNewsRecordWithStatus = MemberNewsRecord & { status: { value: string, label: string } }
export type Props = {
	presentMemberNews: MemberNewsRecord[],
	memberNews: MemberNewsRecord[],
	memberNewsCategories: MemberNewsCategoryRecord[]
	date: string
	region?: Region,
	pagination: Pagination
}

export default function MemberNews({ presentMemberNews, memberNews: memberNewsFromProps, memberNewsCategories, date, pagination, region }: Props) {

	const [memberNewsCategoryId, setMemberNewsCategoryId] = useState<string | string[] | undefined>()
	const { data: { memberNews }, loading, error, nextPage, page } = useApiQuery<{ memberNews: MemberNewsRecord[] }>(AllPastAndFutureMemberNewsDocument, {
		initialData: { memberNews: memberNewsFromProps, pagination },
		variables: { first: pageSize, date, regionId: region.global ? undefined : region.id },
		pageSize
	});

	const { inView, ref } = useInView({ triggerOnce: true, rootMargin: '0px 0px 2000px 0px' })

	useEffect(() => {
		if (inView && !page.end && !loading)
			nextPage()
	}, [inView, page, loading, nextPage])

	const allNews = presentMemberNews
		.concat(memberNews)
		.filter(({ category }) => memberNewsCategoryId ? memberNewsCategoryId === category?.id : true)

	return (
		<>
			<h1><RevealText>Aktuellt för medlemmar</RevealText></h1>

			<FilterBar
				multi={false}
				options={memberNewsCategories.map(({ id, category }) => ({ label: category, id }))}
				onChange={(id) => setMemberNewsCategoryId(id)}
			/>

			<CardContainer columns={2} className={s.memberNews} key={`${page.no}-${memberNewsCategoryId}-${allNews.length}`}>
				{allNews.length > 0 ? allNews.map((el, idx) => {
					const { id, date, title, intro, slug, region, image, category } = el
					return (
						<NewsCard
							key={id}
							title={title}
							subtitle={`${category.category} • ${format(new Date(date), "d MMM").replace('.', '')} • ${region.name}`}
							label={memberNewsStatus(el.date, el.dateEnd).label}
							text={intro}
							image={image}
							slug={`/${region.slug}/konstnar/aktuellt/${slug}`}
							regionName={region.name}
						/>
					)
				}) : <div className={s.nomatches}>Inga träffar...</div>
				}
			</CardContainer>

			{!page.end &&
				<div ref={ref} className={s.loader} key={`page-${page.no}`}>
					{loading && <Loader />}
				</div>
			}

			{error &&
				<div className={s.error}><>Error: {error.message || error}</></div>
			}
		</>
	);
}

MemberNews.page = { title: 'Aktuellt', crumbs: [{ title: 'Aktuellt' }], regional: true } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllMemberNewsCategoriesDocument] }, async ({ props, revalidate, context }: any) => {

	const page = parseInt(context.params?.page) || 1;
	const isFirstPage = page === 1
	const regionId = props.region.global ? undefined : props.region.id;
	const date = format(new Date(), 'yyyy-MM-dd')

	let { presentMemberNews } = await apiQuery(AllPresentMemberNewsDocument, { variables: { regionId, date } });
	let { memberNews, pagination } = await apiQueryAll(AllPastAndFutureMemberNewsDocument, { variables: { regionId, date } });

	let start = (isFirstPage ? 0 : (page - 1) * pageSize)
	let end = isFirstPage ? pageSize : ((pageSize * (page)))

	const count = memberNews.length

	memberNews = memberNews
		.map(el => ({ ...el, status: memberNewsStatus(el.date, el.dateEnd) }))
		.slice(start, end)

	presentMemberNews = presentMemberNews
		.map(el => ({ ...el, status: memberNewsStatus(el.date, el.dateEnd) }))
		.sort((a, b) => a.status.order > b.status.order ? -1 : 1)

	if (!memberNews.length && !presentMemberNews.length)
		return { notFound: true }

	console.log(presentMemberNews.length)
	return {
		props: {
			...props,
			presentMemberNews,
			memberNews,
			date,
			pagination: { ...pagination, page, size: pageSize, count }
		},
		revalidate
	};
});