import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { regions, apiTokenByRegion } from "/lib/region";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllNewsDocument, AllNewsByRegionDocument } from "/graphql";

import Link from "next/link";

export type Props = {
	news: NewsRecord[],
	region?: Region
}

export default function News({ news, region }: Props) {

	return (
		<div className={styles.container}>
			<ul>
				{news.length ? news.map(({ slug, title }, idx) =>
					<li key={idx} >
						<Link href={region ? `/${region.slug}/nyheter/${slug}` : `/nyheter/${slug}`}>
							{title}
						</Link>
					</li>
				) :
					<>Inga nyheter...</>
				}
			</ul>
		</div>
	);
}

export async function getStaticPaths(context) {

	const paths = regions.map(({ slug }) => ({ params: { region: slug } }))

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const { news } = await apiQuery(AllNewsByRegionDocument, { variables: { id: props.region?.id } });

	return {
		props: {
			...props,
			news
		},
		revalidate
	};
});
