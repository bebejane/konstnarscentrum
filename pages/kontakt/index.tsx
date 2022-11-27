import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { RegionMetaDocument } from "/graphql";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import { CardContainer, Card } from "/components";
import { Image } from "react-datocms";

export type Props = {
	contactIntro: RegionRecord['contactIntro'],
	info: RegionRecord['info'],
	employees: EmployeeRecord[]
}

export default function Contact({ contactIntro, info, employees }: Props) {

	return (
		<div className={s.container}>
			<h1>Kontakta oss</h1>
			<Markdown className={s.intro}>
				{contactIntro}
			</Markdown>
			<h2>Personal</h2>
			<CardContainer>
				{employees.concat(employees).map(({ name, email, image }, idx) =>
					<Card key={idx} className={s.employee}>
						<Image data={image.responsiveImage} className={s.image} />
						<div>{name}</div>
						<div>{email}</div>
					</Card>
				)}
			</CardContainer>
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const { region: { contactIntro, info }, employees } = await apiQuery(RegionMetaDocument, { variables: { regionId: props.region?.id } });

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
