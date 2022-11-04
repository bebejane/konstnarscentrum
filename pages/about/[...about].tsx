import styles from "./[...about].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import { AboutDocument, AllAboutsDocument } from "/graphql";
import { Image } from 'react-datocms'
import type { GetStaticProps } from 'next'

type AboutProps = {
  about: AboutRecord
}
export default function About({ about } : AboutProps) {
	console.log(about);
	
	return (
		<div className={styles.container}>
      {about.title}
			<Markdown>{about.intro}</Markdown>
			{ about.image && <Image data={about.image.responsiveImage}/>}
		</div>
	);
}


export async function getStaticPaths(context) {
  const { abouts } = await apiQuery(AllAboutsDocument)
	const paths = abouts.map(({ slug }) => ({ params: { about: [slug] } }));

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps : GetStaticProps = withGlobalProps({queries:[]}, async ({props, revalidate, context } : any) => {
	
	const slug = context.params.about[0];
	const { about } = await apiQuery(AboutDocument, {variables:{slug}});
	
	return {
		props:{
			...props,
			about
		},
		revalidate
	};
});

