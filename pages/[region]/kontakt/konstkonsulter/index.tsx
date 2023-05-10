import React from "react";
import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { RegionMetaDocument, AllConsultantsDocument } from "/graphql";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import { Card, RevealText, KCImage as Image } from "/components";

export type Props = {
	contactIntro: RegionRecord['contactIntro'],
	info: RegionRecord['info'],
	employees: EmployeeRecord[],
	region: Region
	consultants: ConsultantRecord[] | undefined
}

export type EmployeesByRegion = {
	employees: EmployeeRecord[]
	region: RegionRecord
}[]

export default function ArtConsultants({ consultants, contactIntro, employees }: Props) {

	const employeesByRegion: EmployeesByRegion = []

	employees.forEach(e => {
		const idx = employeesByRegion.findIndex(el => el.region.id === e.region.id)
		if (idx === -1)
			employeesByRegion.push({ employees: [e], region: e.region })
		else
			employeesByRegion[idx].employees.push(e)
	})

	return (
		<div className={s.container}>
			<h1><RevealText>Kontakta vår konstkonsulter</RevealText></h1>
			<Markdown className="intro">
				{contactIntro}
			</Markdown>
			<h3>Konstkonsulter</h3>
			<ul className={s.consultants}>
				{consultants.map(({ id, name, title, email }, i) =>
					<Card key={id} className={s.consultant}>
						<p>{name}</p>
						<p className="mid">{title}</p>
						<p className="mid"><a href={`mailto:${email}`}>{email}</a></p>
					</Card>
				)}
			</ul>
		</div>
	);
}

ArtConsultants.page = { title: 'Konstkonsulter', crumbs: [{ title: 'Kontakt', regional: false }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const regionId = props.region.global ? undefined : props.region.id;
	const { region: { contactIntro, info }, employees } = await apiQuery(RegionMetaDocument, { variables: { regionId } });
	const { consultants } = await apiQuery(AllConsultantsDocument);

	return {
		props: {
			...props,
			consultants: !regionId ? consultants : null,
			contactIntro,
			info,
			employees
		},
		revalidate
	};
});
