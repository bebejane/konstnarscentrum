import styles from "./[memberNews].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { MemberNewsDocument, AllMemberNewsDocument } from "/graphql";
import { format } from "date-fns";
import { Article, MetaSection, StructuredContent } from "/components";
import { getStaticPagePaths } from "/lib/utils";

export type Props = {
	memberNews: MemberNewsRecord,
	region: Region
}

export default function News({ memberNews: {
	createdAt,
	date,
	intro,
	title,
	content,
	image,
	location,
	category,
	region
} }: Props) {

	return (
		<Article
			image={image}
			title={title}
			text={intro}
			subtitle={`${format(new Date(createdAt), "d MMMM y")} • ${region.name}`}
		>
			<MetaSection
				items={[
					{ title: 'Kategori', value: category.category },
					{ title: 'Plats', value: location },
					{ title: 'Datum', value: format(new Date(date), "d MMMM y") },
					{ title: 'Region', value: region?.name }
				]}
			/>
			<StructuredContent content={content} />
		</Article>
	);
}

export async function getStaticPaths() {
	return getStaticPagePaths(AllMemberNewsDocument, 'memberNews')
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.memberNews;
	const { memberNews } = await apiQuery(MemberNewsDocument, { variables: { slug }, preview: context.preview })

	if (!memberNews)
		return { notFound: true }

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