import s from "./index.module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { AllProjectsDocument, ProjectsIntroDocument } from "/graphql";
import { Image } from "react-datocms";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import useDevice from "/lib/hooks/useDevice";
import { CardContainer, Card } from "/components";

export type Props = {
	projects: ProjectRecord[],
	introInitiative: IntroInitiativeRecord
}

export default function Initiatives({ projects, introInitiative: { intro } }: Props) {

	const { isMobile } = useDevice()

	return (
		<div className={s.container}>
			<h1>Våra initiativ</h1>
			<Markdown className={s.intro}>
				{intro}
			</Markdown>
			<CardContainer columns={2}>
				{projects.map(({ title, text, url, image }, idx) =>
					<Card key={idx}>
						<Image className={s.image} data={image.responsiveImage} />
						<h3>{title}</h3>
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

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllProjectsDocument, ProjectsIntroDocument] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
