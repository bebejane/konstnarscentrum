import styles from "./[aktuellt].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { regions, apiTokenByRegion } from "/lib/region";
import { apiQuery } from "dato-nextjs-utils/api";
import { MemberNewsDocument, AllMemberNewsDocument } from "/graphql";
import { format } from "date-fns";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import { StructuredContent } from "/components";

export type Props = {
	memberNews: MemberNewsRecord,
	region: Region
}

export default function News({ memberNews: { date, title, content }, region }: Props) {

	return (
		<div className={styles.container}>
			<h1>{title}</h1>
			<h5>{format(new Date(date), "d MMMM y")} &#8226; {region.name}</h5>
			<StructuredContent content={content} />
		</div>
	);
}

export async function getStaticPaths(context) {
	const { memberNews } = await apiQuery(AllMemberNewsDocument)

	const paths = []

	memberNews.forEach(({ slug }) => regions.forEach(d => paths.push({ params: { memberNews: slug, region: d.slug } })))

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.memberNews;
	const { memberNews } = await apiQuery(MemberNewsDocument, { variables: { slug } })

	return {
		props: {
			...props,
			memberNews
		},
	};
});

export const config = {
	//runtime:'experimental-edge'
}