import s from "./[consult].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { ConsultDocument, AllConsultsDocument } from "/graphql";
import type { GetStaticProps } from 'next'
import { Article } from "/components";

type ConsultProps = {
	consult: ConsultRecord
}

export default function Consult({ consult: { id, title, image, intro, content } }: ConsultProps) {

	return (
		<Article
			id={id}
			key={id}
			title={title}
			image={image}
			text={intro}
			content={content}
		/>
	);
}

Consult.page = { crumbs: [{ title: 'Anlita oss', regional: false }] } as PageProps

export async function getStaticPaths() {
	const { consults } = await apiQuery(AllConsultsDocument)
	const paths = consults.map(({ slug }) => ({ params: { consult: slug } }));

	return {
		paths,
		fallback: true,
	};
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.consult;
	const { consult } = await apiQuery(ConsultDocument, { variables: { slug }, preview: context.preview });

	return {
		props: {
			...props,
			consult
		},
		revalidate
	};
});

