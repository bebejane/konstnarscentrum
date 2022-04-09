import styles from "./index.module.scss";
import districts from '/districts.json'
import District from "/components/district";
import { apiQuery } from "/lib/dato/api";
import { GetAllNews } from "/graphql/news.graphql"

export default function DistrictHome({district, news}) {
  console.log(news)
	return (
    <div className={styles.container}>
      <div><h2>Konstnärscentrum</h2></div>
			<District district={district} news={news}/>
    </div>
  )
}

export async function getStaticPaths(context) {
	const paths = districts.map(({slug}) => ({params:{district:[slug]}}) )
  //console.log(paths)
	return {
		paths,
		fallback: false
	}
}
export async function getStaticProps(context) {
	const district = districts.filter(({slug}) => slug === context.params.district[0])[0]
	const { news } = await apiQuery(GetAllNews, {}, false, district.token.token);
	return {
		props: {news},
		revalidate:30
	}
}