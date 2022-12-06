import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllMemberNewsDocument } from "/graphql";
import { format } from "date-fns";
import { pageSize } from "/lib/utils";
import { Pager, CardContainer, NewsCard } from '/components'

export type Props = {
	memberNews: MemberNewsRecord[]
	region?: Region,
	pagination: Pagination
}

export default function MemberNews({ memberNews, region, pagination }: Props) {

	return (
		<>
			<h1 className="noPadding">Aktuellt</h1>
			<CardContainer columns={2} className={s.memberNews}>
				{memberNews.map(({ date, title, intro, slug, region, image }, idx) =>
					<NewsCard
						key={idx}
						title={title}
						subtitle={`${format(new Date(date), "d MMMM y")} • ${region.name}`}
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

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

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
			memberNews,
			pagination: { ...pagination, page, size: pageSize }
		},
		revalidate
	};
});