import s from "./index.module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { AllProjectsDocument, ProjectsIntroDocument } from "/graphql";
import { KCImage as Image } from '/components'
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import { CardContainer, Card, RevealText } from "/components";

export type Props = {
	projects: ProjectRecord[],
	introInitiative: IntroInitiativeRecord,
	region: Region
}

export default function Initiatives({ projects, introInitiative: { intro }, region }: Props) {

	return (
		<div className={s.container}>
			<h1><RevealText>Våra initiativ</RevealText></h1>
			<Markdown className={s.intro}>
				{intro}
			</Markdown>
			<CardContainer columns={2}>
				{projects.map(({ title, text, url, image }, idx) =>
					<Card key={idx}>
						<a href={url}>
							<Image className={s.image} data={image.responsiveImage} />

							<h3>{title}</h3>
						</a>
						<Markdown className={cn('mid', s.text)}>
							{text}
						</Markdown>
						<a href={url}>
							<button>Besök {title}</button>
						</a>
					</Card>
				)}
			</CardContainer>
		</div>
	);
}

Initiatives.page = { title: 'Våra initiativ', crumbs: [{ title: 'Våra initiativ' }], regional: true } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllProjectsDocument, ProjectsIntroDocument] }, async ({ props, revalidate, context }: any) => {

	const regionId = props.region.global ? undefined : props.region.id;
	const projects = props.projects.sort((a, b) => a.region.id === regionId ? -1 : 1)

	return {
		props: {
			...props,
			projects
		},
		revalidate
	};
});
