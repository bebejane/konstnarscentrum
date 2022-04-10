import styles from "./index.module.scss";
import districts from '/districts.json'
import District from "/components/district";
import { apiQuery } from "/lib/dato/api";
import { GetAllNews } from "/graphql/news.graphql"

export default function DistrictHome({district, news}) {
	return (
    <div className={styles.container}>
			<District district={district} news={news}/>
    </div>
  )
}

export async function getStaticPaths(context) {
	const paths = districts.map(({slug}) => ({params:{district:[slug]}}) )
	return {
		paths,
		fallback: false
	}
}
export async function getStaticProps(context) {
	const district = context.params.district[0];
	const token = process.env[`GRAPHQL_API_TOKEN_${district.toUpperCase()}`]
	const { news } = await apiQuery(GetAllNews, {}, false, token);

	return {
		props: { news },
		revalidate: 30
	}
}