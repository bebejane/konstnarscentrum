import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllMemberNewsDocument, AllMemberNewsCategoriesDocument } from "/graphql";
import { format, isAfter, isBefore } from "date-fns";
import { pageSize } from "/lib/utils";
import { Pager, CardContainer, NewsCard, FilterBar } from '/components'
import { useState } from "react";

export type MemberNewsRecordWithStatus = MemberNewsRecord & { status: string }
export type Props = {
	memberNews: MemberNewsRecordWithStatus[],
	memberNewsCategories: MemberNewsCategoryRecord[]
	region?: Region,
	pagination: Pagination
}

export default function MemberNews({ memberNews, memberNewsCategories, region, pagination }: Props) {

	const [memberNewsCategoryIds, setMemberNewsCategoryIds] = useState<string | string[] | undefined>()

	return (
		<>
			<h1>Aktuellt</h1>
			<FilterBar
				multi={true}
				options={memberNewsCategories.map(({ id, category }) => ({ label: category, id }))}
				onChange={(ids) => setMemberNewsCategoryIds(ids)}
			/>

			<CardContainer columns={2} className={s.memberNews}>
				{memberNews.map(({ date, title, intro, slug, region, image, category, status }, idx) =>
					<NewsCard
						key={idx}
						title={title}
						subtitle={`${category.category} | ${format(new Date(date), "d MMM")} | ${region.name}`}
						label={status}
						text={intro}
						image={image}
						slug={`/konstnar/aktuellt/${slug}`}
						regionName={region.name}
					/>
				)}
			</CardContainer>
			<Pager pagination={pagination} slug={'/konstnar/aktuellt'} />
		</>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllMemberNewsCategoriesDocument] }, async ({ props, revalidate, context }: any) => {

	const page = parseInt(context.params?.page) || 1;
	const regionId = props.region.global ? undefined : props.region.id;
	const { memberNews, pagination } = await apiQuery(AllMemberNewsDocument, {
		variables: {
			regionId,
			first: pageSize,
			skip: (pageSize * (page - 1))
		}
	});

	return {
		props: {
			...props,
			memberNews: memberNews.map(el => ({
				...el,
				status: isAfter(new Date(), new Date(el.date)) ? 'Avslutat' : isBefore(new Date(), new Date(el.date)) ? 'Kommande' : 'Nu'
			})),
			pagination: { ...pagination, page, size: pageSize }
		},
		revalidate
	};
});