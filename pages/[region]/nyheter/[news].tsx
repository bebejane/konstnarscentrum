import styles from "./[news].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { regions, apiTokenByRegion } from "/lib/region";
import { apiQuery } from "dato-nextjs-utils/api";
import { NewsDocument, AllNewsDocument } from "/graphql";
import { format } from "date-fns";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";

export type Props = {
	news: NewsRecord,
	region: Region
}

export default function News({ news: { createdAt, title, content }, region }: Props) {

	return (
		<div className={styles.container}>
			<h1>{title}</h1>
			{format(new Date(createdAt), "yyyy-MM-dd HH:mm")}
			<Markdown>{content}</Markdown>
		</div>
	);
}

export async function getStaticPaths(context) {
	const { news } = await apiQuery(AllNewsDocument)

	const paths = []

	news.forEach(({ slug }) => regions.forEach(d => paths.push({ params: { news: slug, region: d.slug } })))

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.news;
	const { news } = await apiQuery(NewsDocument, { variables: { slug }, apiToken: apiTokenByRegion(props.region.id) })

	return {
		props: {
			...props,
			news
		},
	};
});

export const config = {
	//runtime:'experimental-edge'
}