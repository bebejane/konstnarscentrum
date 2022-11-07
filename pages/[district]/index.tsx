import styles from "./index.module.scss";
import { districts } from "/lib/district";
import { apiQuery } from "dato-nextjs-utils/api";
import { StartDocument } from "/graphql";
import { propByDistrict } from "/lib/district";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import Link from "next/link";

export default function DistrictHome({ district, start }) {
	
	return(
		<div className={styles.container}>
			<h1>{district.name}</h1>
			<p>
			<Link href={`/${district.slug}/nyheter`}>Go to Nyheter</Link>
			</p>
			<h2>Start</h2>
			{start?.headline}
			<Markdown>{start?.intro}</Markdown>
		</div>
	);
}

export async function getStaticPaths(context) {
	const paths = districts.reduce((p, {slug}) => {
		p.push({ params: { district: slug } })
		//p.push({ params: { district: [slug, 'nyheter'] } })
		return p
	}, []);
	
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	console.log(context.params);
	
	const slug = context.params.district;
	const res = await apiQuery(StartDocument);
	const start = propByDistrict(res, slug, 'start')

	return {
		props: { 
			start, 
			district: districts.find(d => d.slug === slug) 
		},
		revalidate: 30,
	};
}
