import styles from "./[...district].module.scss";
import { districts } from "/lib/district";
import { apiQuery } from "dato-nextjs-utils/api";
import { StartDocument } from "/graphql";
import { propByDistrict } from "/lib/district";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";

export default function DistrictHome({ district, start }) {
	
	return (
		<div className={styles.container}>
			<h1>Nyheter {district}</h1>
			{start?.headline}
			<Markdown>{start?.intro}</Markdown>
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
	const res = await apiQuery(StartDocument);
	const start = propByDistrict(res, district, 'start')

	return {
		props: { start,district  },
		revalidate: 30,
	};
}
