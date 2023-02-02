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

export default function Contact({ consultants, contactIntro, employees }: Props) {

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
						{region.info.length < 0 &&
							< ul className={s.info}>
								{region.info.map(({ text, title }, idx) =>
									<li key={idx}>{title}: {text}</li>
								)}
							</ul>
						}
						<ul className={s.list}>
							{employees.map(({ name, email, image, title }, idx) =>
								<Card key={idx} className={s.employee}>
									<p>{name}</p>
									<p className="mid">{title}</p>
									<p className="mid"><a href="mailto:{email}">{email}</a></p>
								</Card>
							)}
						</ul>
						{idx === 0 && consultants &&
							<>
								<h3>Konstkonsulter</h3>
								<ul className={s.consultants}>
									{consultants.map(({ id, name, title, email }, i) =>
										<li key={id}>
											{name} {title} {email}
										</li>
									)}
								</ul>
							</>
						}
					</React.Fragment>
				)
			})}
		</div >
	);
}

Contact.page = { title: 'Kontakt', crumbs: [{ title: 'Kontakt', regional: false }] } as PageProps

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
