import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { districts } from "/lib/district";
import { apiQuery } from "dato-nextjs-utils/api";
import { StartDocument } from "/graphql";
import { propByDistrict } from "/lib/district";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import Link from "next/link";

export default function DistrictHome({ district, start }) {

	if (!district)
		return <div>Not found</div>

	return (
		<div className={styles.container}>
			<h1>{district.name}</h1>
			<p>
				<Link href={`/${district.slug}/nyheter`}>
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
	const paths = districts.map(({ slug }) => ({ params: { district: slug } }))
	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.district;
	const res = await apiQuery(StartDocument);
	const start = propByDistrict(res, slug, 'start')

	return {
		props: {
			...props,
			start,
			district: districts.find(d => d.slug === slug)
		},
		revalidate
	};
});
