import styles from "./News.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { districts, apiTokenByDistrict } from "/lib/district";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllNewsDocument } from "/graphql";
import { format } from "date-fns";
import client from "/lib/client";

export default function News({ news, news2, district }) {
	console.log(news2);
	
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

export { getStaticPaths } from '../index'

export const getStaticProps : GetStaticProps = withGlobalProps({queries:[]}, async ({props, revalidate, context } : any) => {
	

	const district = districts.find(d => d.slug === context.params.district)
	console.log(apiTokenByDistrict(district.slug));
	console.log(district)
	const news2 = (await client.items.list({
		filter:{
			type:"news"
		}
	})).filter(n => n.creator.id === district.tokenId)

	const { news } = await apiQuery(AllNewsDocument, {apiToken: apiTokenByDistrict(district.slug)})
	
	return {
		props: {
			news,
			news2,
			district
		},
	};
});

export const config = {
	//runtime:'experimental-edge'
}