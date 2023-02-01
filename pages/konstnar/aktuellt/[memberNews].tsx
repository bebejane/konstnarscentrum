import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { MemberNewsDocument, AllMemberNewsDocument } from "/graphql";
import { format } from "date-fns";
import { Article, MetaSection, StructuredContent, RegionLink } from "/components";
import { getStaticPagePaths } from "/lib/utils";
import { DatoSEO } from "dato-nextjs-utils/components";

export type Props = {
	memberNews: MemberNewsRecord,
	region: Region
}

export default function MemberNewsArticle({ memberNews: {
	id,
	createdAt,
	date,
	dateEnd,
	intro,
	title,
	content,
	image,
	location,
	category,
	blackHeadline,
	region,
	_seoMetaTags
}, memberNews }: Props) {

	return (
		<>
			<DatoSEO title={title} description={intro} seo={_seoMetaTags} />
			<Article
				id={id}
				image={image}
				title={title}
				text={intro}
				blackHeadline={blackHeadline}
			>
				<MetaSection
					items={[
						{ title: 'Kategori', value: category.category },
						{ title: 'Plats', value: location },
						{ title: 'Region', value: region?.name },
						{ title: 'Datum', value: format(new Date(date), "d MMMM y") },
						{ title: 'Slutdatum', value: dateEnd ? format(new Date(dateEnd), "d MMMM y") : undefined },
					]}
				/>
				<StructuredContent id={id} record={memberNews} content={content} />
			</Article>
			<RegionLink href={'/konstnar/aktuellt'}>
				<button className="wide">Tillbaka till översikt</button>
			</RegionLink>
		</>
	);
}

MemberNewsArticle.page = { crumbs: [{ slug: 'konstnar/aktuellt', title: 'Aktuellt' }], regional: true } as PageProps

export async function getStaticPaths() {
	return getStaticPagePaths(AllMemberNewsDocument, 'memberNews')
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.memberNews;
	const { memberNews }: { memberNews: MemberNewsRecord } = await apiQuery(MemberNewsDocument, { variables: { slug }, preview: context.preview })

	if (!memberNews)
		return { notFound: true }

	return {
		props: {
			...props,
			memberNews,
			pageTitle: memberNews.title
		},
	};
});