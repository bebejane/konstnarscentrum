import s from "./[about].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { AboutDocument, AllAboutsDocument } from "/graphql";
import type { GetStaticProps } from 'next'
import { Article } from "/components";
import { useEffect, useState } from "react";
import useStore from "/lib/store";

type AboutProps = {
	about: AboutRecord
}

export default function About({ about: { id, title, image, intro, content } }: AboutProps) {

	const [setImages, setImageId] = useStore((state) => [state.setImages, state.setImageId])

	useEffect(() => {
		const images = [image, ...content.blocks.filter(({ image }) => image).reduce((imgs, { image }) => imgs = imgs.concat(image), [])]
		setImages(images)
	}, [image, content, setImages])

	return (
		<Article
			key={id}
			title={title}
			image={image}
			text={intro}
			content={content}
			onClick={(imageId) => setImageId(imageId)}
		/>
	);
}

About.page = { crumbs: [{ slug: 'om', title: 'Om' }] } as PageProps

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
	const { about } = await apiQuery(AboutDocument, { variables: { slug }, preview: context.preview });

	return {
		props: {
			...props,
			about,
			pageTitle: about.title
		},
		revalidate
	};
});

