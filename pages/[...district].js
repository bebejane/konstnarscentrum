import styles from "./index.module.scss";
import districts from "/districts.json";
import { apiQuery } from "/lib/dato/api";
import { Start } from "/graphql/start.graphql";
import { propByDistrict } from "lib/utils/district";

import Markdown from "lib/dato/components/Markdown";

export default function DistrictHome({ district, start }) {
	if(!start) return null
	return (
		<div className={styles.container}>
			{start.headline}
			<Markdown>{start.intro}</Markdown>
		</div>
	);
}

export async function getStaticPaths(context) {
	const paths = districts.map(({ slug }) => ({ params: { district: [slug] } }));
	return {
		paths,
		fallback: false,
	};
}
export async function getStaticProps(context) {
	const district = context.params.district[0];
	const res = await apiQuery(Start, {}, false);
	const start = propByDistrict(res, district, 'start')
	
	return {
		props: { start },
		revalidate: 30,
	};
}
