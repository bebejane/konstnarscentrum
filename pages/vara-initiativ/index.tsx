import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import Link from "next/link";
import { AllProjectsDocument } from "/graphql";
import { Image } from "react-datocms";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
export type Props = {
	projects: ProjectRecord[]
}

export default function Initiatives({ projects }: Props) {

	return (
		<div className={s.container}>
			<h1>Våra initiativ</h1>
			<ul>
				{projects.map(({ title, text, url, image }, idx) =>
					<li key={idx}>
						<Image data={image.responsiveImage} />
						<h2>{title}</h2>
						<Markdown>
							{text}
						</Markdown>
						<a href={url}>
							<button>Besök {title}</button>
						</a>
					</li>
				)}
			</ul>
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllProjectsDocument] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
