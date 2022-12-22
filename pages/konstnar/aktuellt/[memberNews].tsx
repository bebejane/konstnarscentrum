import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { MemberNewsDocument, AllMemberNewsDocument } from "/graphql";
import { format } from "date-fns";
import { Article, MetaSection, StructuredContent, RegionLink } from "/components";
import { getStaticPagePaths } from "/lib/utils";

export type Props = {
	memberNews: MemberNewsRecord,
	region: Region
}

export default function MemberNewsArticle({ memberNews: {
	id,
	createdAt,
	date,
	intro,
	title,
	content,
	image,
	location,
	category,
	blackHeadline,
	region
} }: Props) {

	console.log(id);

	return (
		<>
			<Article
				id={id}
				image={image}
				title={title}
				text={intro}
				blackHeadline={blackHeadline}
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
				<StructuredContent id={id} content={content} />
			</Article>
			<RegionLink href={'/konstnar/aktuellt'}>
				<button className="wide">Tillbaka till översikt</button>
			</RegionLink>
		</>
	);
}

MemberNewsArticle.page = { crumbs: [{ slug: 'konstnar/aktuellt', title: 'Aktuellt', regional: true }] } as PageProps

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