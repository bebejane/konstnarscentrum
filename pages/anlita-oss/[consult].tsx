import s from "./[consult].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { ConsultDocument, AllConsultsDocument } from "/graphql";
import type { GetStaticProps } from 'next'
import { Article } from "/components";
import { DatoSEO } from "dato-nextjs-utils/components";

type ConsultProps = {
	consult: ConsultRecord
}

export default function Consult({ consult: { id, title, image, intro, content, _seoMetaTags } }: ConsultProps) {

	return (
		<>
			<DatoSEO title={title} description={intro} seo={_seoMetaTags} />
			<Article
				id={id}
				key={id}
				title={title}
				image={image}
				text={intro}
				content={content}
			/>
		</>
	);
}

Consult.page = { regional: false, crumbs: [{ title: 'Anlita en konstkonsult', regional: false }] } as PageProps

export async function getStaticPaths() {
	const { consults } = await apiQuery(AllConsultsDocument)
	const paths = consults.map(({ slug }) => ({ params: { consult: slug } }));

	return {
		paths,
		fallback: 'blocking',
	};
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.consult;
	const { consult } = await apiQuery(ConsultDocument, { variables: { slug }, preview: context.preview });

	if (!consult) {
		return {
			notFound: true,
			revalidate
		}
	}

	return {
		props: {
			...props,
			consult,
			pageTitle: consult.title
		},
		revalidate
	};
});

