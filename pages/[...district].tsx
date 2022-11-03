import styles from "./[...district].module.scss";
import { districts } from "/lib/district";
import { apiQuery } from "dato-nextjs-utils/api";
import { Start } from "/lib/graphql/start.gql";
import { propByDistrict } from "/lib/district";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";

export default function DistrictHome({ district, start }) {
	if (!start) return null
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
	const res = await apiQuery(Start, {preview:false});
	const start = propByDistrict(res, district, 'start')

	return {
		props: { start },
		revalidate: 30,
	};
}
