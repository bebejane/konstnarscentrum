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
	employees: EmployeeRecord[],
	region: RegionRecord
}

export type EmployeesByRegion = {
	employees: EmployeeRecord[]
	region: RegionRecord
}[]

export default function Employees({ contactIntro, employees }: Props) {

	return (
		<div className={s.container}>
			<h1><RevealText>Våra anställda</RevealText></h1>
			<Markdown className="intro">
				{contactIntro.staff}
			</Markdown>
			<ul>
				{employees.map(({ name, email, title }, idx) =>
					<Card key={idx} className={s.employee}>
						<p>{name}</p>
						<p className="mid">{title}</p>
						<p className="mid"><a href={`mailto:${email}`}>{email}</a></p>
					</Card>
				)}
			</ul>
		</div >
	);
}

Employees.page = { title: 'Anställda', crumbs: [{ title: 'Kontakt', regional: false }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [ContactDocument] }, async ({ props, revalidate }: any) => {

	const regionId = props.region.global ? undefined : props.region.id;
	const { region: { info }, employees } = await apiQuery(RegionMetaDocument, { variables: { regionId } });

	return {
		props: {
			...props,
			info,
			employees
		},
		revalidate
	};
});
