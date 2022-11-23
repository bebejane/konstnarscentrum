import styles from "./[about].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import { AboutDocument, AllAboutsDocument } from "/graphql";
import { Image } from 'react-datocms'
import type { GetStaticProps } from 'next'
import { StructuredContent } from "/components";

type AboutProps = {
	about: AboutRecord
}

export default function About({ about }: AboutProps) {

	return (
		<div className={styles.container}>
			<div className={styles.topImage}>
				<h1>{about.title}</h1>
				{about.image &&
					<Image className={styles.image} data={about.image.responsiveImage} />
				}
			</div>
			<Markdown className="intro">{about.intro}</Markdown>

			<StructuredContent content={about.content} />
		</div>
	);
}


export async function getStaticPaths() {
	const { abouts } = await apiQuery(AllAboutsDocument)
	const paths = abouts.map(({ slug }) => ({ params: { about: slug } }));

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.about;
	const { about } = await apiQuery(AboutDocument, { variables: { slug } });

	return {
		props: {
			...props,
			about
		},
		revalidate
	};
});

