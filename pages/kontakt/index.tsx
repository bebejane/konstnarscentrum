import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { RegionMetaDocument } from "/graphql";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import { Card, RevealText } from "/components";
import { KCImage as Image } from '/components'
import React from "react";

export type Props = {
	contactIntro: RegionRecord['contactIntro'],
	info: RegionRecord['info'],
	employees: EmployeeRecord[],
	region: Region
}

export type EmployeesByRegion = {
	employees: EmployeeRecord[]
	region: RegionRecord
}[]

export default function Contact({ contactIntro, info, employees, region }: Props) {

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
			<h1><RevealText>Kontakta oss</RevealText></h1>
			<Markdown className="intro">
				{contactIntro}
			</Markdown>
			{employeesByRegion.sort((a, b) => a.region.position > b.region.position ? 1 : -1).map(({ region, employees }, idx) => {
				return (
					<React.Fragment key={idx}>
						<h3>{region.global ? `Förbundet` : `Konstnärscentrum ${region.name}`}</h3>
						<ul className={s.region}>
							{employees.map(({ name, email, image, title }, idx) =>
								<Card key={idx} className={s.employee}>
									<p>{name}</p>
									<p className="mid">{title}</p>
									<p className="mid"><a href="mailto:{email}">{email}</a></p>
								</Card>
							)}
						</ul>
					</React.Fragment>
				)
			}
			)}

		</div >
	);
}

Contact.page = { crumbs: [{ title: 'Kontakt', regional: false }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const regionId = props.region.global ? undefined : props.region.id;
	const { region: { contactIntro, info }, employees } = await apiQuery(RegionMetaDocument, { variables: { regionId } });

	return {
		props: {
			...props,
			contactIntro,
			info,
			employees
		},
		revalidate
	};
});
