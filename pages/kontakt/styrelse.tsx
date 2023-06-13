import React from "react";
import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { RegionMetaDocument, ContactDocument } from "/graphql";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import { Card, RevealText } from "/components";

export type Props = {
	contactIntro: ContactIntroRecord,
	info: RegionRecord['info'],
	boardmembers: BoardRecord[],
	region: Region
}

export default function BoardMembers({ boardmembers, contactIntro }: Props) {

	return (
		<div className={s.container}>
			<h1><RevealText>Styrelse</RevealText></h1>
			<Markdown className="intro">
				{contactIntro.board}
			</Markdown>
			<h3>Styrelse</h3>
			<ul>
				{boardmembers.map(({ id, name, title, email, region }, i) =>
					<Card key={id} className={s.card}>
						<p>
							<a href={`mailto:${email}`}>{name}</a>
							<br />
							{title}
						</p>

					</Card>
				)}
			</ul>
		</div >
	);
}

BoardMembers.page = { title: 'Styrelse', crumbs: [{ title: 'Kontakt', regional: false }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [ContactDocument] }, async ({ props, revalidate, context }: any) => {

	const regionId = props.region.global ? undefined : props.region.id;
	const { region: { info }, boardmembers } = await apiQuery(RegionMetaDocument, { variables: { regionId } });

	return {
		props: {
			...props,
			info,
			boardmembers
		},
		revalidate
	};
});
