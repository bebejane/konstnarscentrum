import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { useApiQuery } from 'dato-nextjs-utils/hooks'
import { AllMemberNewsDocument, AllMemberNewsCategoriesDocument } from "/graphql";
import { format } from "date-fns";
import { pageSize, apiQueryAll, memberNewsStatus } from "/lib/utils";
import { Pager, CardContainer, NewsCard, FilterBar, RevealText } from '/components'
import { useState } from "react";

export type MemberNewsRecordWithStatus = MemberNewsRecord & { status: { value: string, label: string } }
export type Props = {
	memberNews: MemberNewsRecordWithStatus[],
	memberNewsCategories: MemberNewsCategoryRecord[]
	region?: Region,
	pagination: Pagination
}

export default function MemberNews({ memberNews, memberNewsCategories, region, pagination }: Props) {

	const [memberNewsCategoryIds, setMemberNewsCategoryIds] = useState<string | string[] | undefined>()
	const { data, loading, error, nextPage, page, loadMore } = useApiQuery<{ memberNews: MemberNewsRecord[] }>(AllMemberNewsDocument, {
		initialData: { memberNews, pagination },
		variables: { first: 10 },
		pageSize
	});

	function handleInView(inView) {
		//if (inView) loadMore({})
	}

	return (
		<>
			<h1><RevealText>Aktuellt för medlemmar</RevealText></h1>

			<FilterBar
				multi={true}
				options={memberNewsCategories.map(({ id, category }) => ({ label: category, id }))}
				onChange={(ids) => setMemberNewsCategoryIds(ids)}
			/>

			<CardContainer columns={2} className={s.memberNews} key={pagination.page}>
				{memberNews.map(({ date, title, intro, slug, region, image, category, status }, idx) =>
					<NewsCard
						key={idx}
						title={title}
						subtitle={`${category.category} • ${format(new Date(date), "d MMM").replace('.', '')} • ${region.name}`}
						label={status.label}
						text={intro}
						image={image}
						slug={`/${region.slug}/konstnar/aktuellt/${slug}`}
						regionName={region.name}
					/>
				)}
			</CardContainer>
			{<Pager pagination={pagination} onInView={handleInView} slug={'/konstnar/aktuellt'} />}
		</>
	);
}

MemberNews.page = { crumbs: [{ title: 'Aktuellt', regional: true }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllMemberNewsCategoriesDocument] }, async ({ props, revalidate, context }: any) => {

	const page = parseInt(context.params?.page) || 1;
	const isFirstPage = page === 1
	const regionId = props.region.global ? undefined : props.region.id;

	let { memberNews, pagination } = await apiQueryAll(AllMemberNewsDocument, { variables: { regionId } });
	let start = (isFirstPage ? 0 : (page - 1) * pageSize)
	let end = isFirstPage ? pageSize : ((pageSize * (page)))

	memberNews = memberNews
		.map(el => ({ ...el, status: memberNewsStatus(el) }))
		.sort((a, b) => a.status.order > b.status.order ? -1 : 1)
		.slice(start, end)

	if (!memberNews.length)
		return { notFound: true }

	return {
		props: {
			...props,
			memberNews,
			pagination: { ...pagination, page, size: pageSize }
		},
		revalidate
	};
});