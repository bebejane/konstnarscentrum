import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { RegionMetaDocument } from "/graphql";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import { CardContainer, Card } from "/components";
import { Image } from "react-datocms";
import React from "react";

export type Props = {
	contactIntro: RegionRecord['contactIntro'],
	info: RegionRecord['info'],
	employees: EmployeeRecord[],
	region: Region
}

export type EmployeesByRegion = {
	[key: Region['id']]: {
		employees: EmployeeRecord[],
		region: RegionRecord
	}
}

export default function Contact({ contactIntro, info, employees, region }: Props) {

	const employeesByRegion: EmployeesByRegion = {}

	employees.forEach(e => {
		if (!employeesByRegion[e.region.id])
			employeesByRegion[e.region.id] = { employees: [], region: e.region }

		employeesByRegion[e.region.id].employees.push(e);
	})

	return (
		<div className={s.container}>
			<h1>Kontakta oss</h1>
			<Markdown className={s.intro}>
				{contactIntro}
			</Markdown>
			{Object.keys(employeesByRegion).map((regionId, idx) => {
				const { employees, region } = employeesByRegion[regionId]
				return (
					<React.Fragment key={idx}>
						<h2>{region.global ? `Förbundet` : `Konstnärscentrum ${region.name}`}</h2>
						<CardContainer>
							{employees.map(({ name, email, image }, idx) =>
								<Card key={idx} className={s.employee}>
									<Image data={image.responsiveImage} className={s.image} />
									<div>{name}</div>
									<div>{email}</div>
								</Card>
							)}
						</CardContainer>
					</React.Fragment>
				)
			}
			)}

		</div>
	);
}

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
