import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllMemberNewsDocument } from "/graphql";
import { format } from "date-fns";

import Link from "next/link";

export type Props = {
	memberNews: MemberNewsRecord[]
	region?: Region
}

export default function MemberNews({ memberNews, region }: Props) {

	return (
		<>
			<h1 className="noPadding">Nyheter</h1>
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
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const id = !props.region.global ? props.region.id : undefined
	const { memberNews } = await apiQuery(AllMemberNewsDocument, { variables: { id } });

	return {
		props: {
			...props,
			memberNews
		},
		revalidate
	};
});
