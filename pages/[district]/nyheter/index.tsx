import styles from "./News.module.scss";
import { districts, apiTokenByDistrict } from "/lib/district";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllNewsDocument } from "/graphql";
import { format } from "date-fns";

export default function News({ news, district }) {

	return (
		<div className={styles.container}>
			<h1>{district.name} News</h1>
			<div className={styles.news}>
				{news.length > 0 ? news.map((n, idx) => (
					<div key={idx}>
						{n.header} - {format(new Date(n.createdAt), "yyyy-MM-dd HH:mm")}
					</div>
				)) :
					<>no newss..</>
				}
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {

	const district = districts.find(d => d.slug === context.params.district)
	console.log(apiTokenByDistrict(district.slug));
	
	const { news } = await apiQuery(AllNewsDocument, {apiToken: apiTokenByDistrict(district.slug)})
	
	return {
		props: {
			news,
			district
		},
	};
}

export const config = {
	//runtime:'experimental-edge'
}