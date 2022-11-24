import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { regions } from "/lib/region";
import { apiQuery } from "dato-nextjs-utils/api";
import { StartDocument } from "/graphql";
import { propByRegion } from "/lib/region";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import Link from "next/link";

export default function RegionHome({ region, start }) {

	if (!region)
		return <div>Not found</div>

	return (
		<div className={styles.container}>
			<h1>{region.name}</h1>
			<p>
				<Link href={`/${region.slug}/nyheter`}>
					Go to Nyheter
				</Link>
			</p>
			<h2>Start</h2>
			{start?.headline}
			<Markdown>{start?.intro}</Markdown>
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

	const slug = context.params.region;
	const res = await apiQuery(StartDocument);
	const start = propByRegion(res, slug, 'start')

	return {
		props: {
			...props,
			start,
			region: regions.find(d => d.slug === slug)
		},
		revalidate
	};
});
