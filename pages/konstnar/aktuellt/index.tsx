import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllMemberNewsDocument } from "/graphql";
import { format } from "date-fns";
import Link from "next/link";
import { pageSize } from "/lib/utils";
import { Pager } from '/components'

export type Props = {
	memberNews: MemberNewsRecord[]
	region?: Region,
	pagination: Pagination
}

export default function MemberNews({ memberNews, region, pagination }: Props) {

	return (
		<>
			<h1 className="noPadding">Aktuellt</h1>
			<div className={s.container}>
				<ul>
					{memberNews.length ? memberNews.map(({ slug, title, intro, date, region }, idx) =>
						<li key={idx} >
							<Link href={region ? `/${region.slug}/konstnar/aktuellt/${slug}` : `/konstnar/aktuellt/${slug}`}>
								<h5>{format(new Date(date), "d MMMM y")} &#8226; {region.name}</h5>
								<h2>{title}</h2>
								<p>{intro}</p>
							</Link>
						</li>
					) :
						<>Inga aktuellt...</>
					}
				</ul>
				<Pager pagination={pagination} slug={'/konstnar/aktuellt'} />
			</div>
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
			skip: (pageSize * page) - 1
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