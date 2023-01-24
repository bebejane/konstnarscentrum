import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { regions } from "/lib/region";
import { Apply } from "/components";
import { ApplyForMembershipDocument } from "/graphql";
import { Article } from "/components";

export type Props = {
	apply: ApplyRecord
}

export default function Member({ apply: { id, content, title, intro, image } }: Props) {

	return (
		<div className={s.container}>
			<Article
				id={id}
				key={id}
				title={title}
				image={image}
				text={intro}
				content={content}
			/>

			<h3>Skicka in ansökan</h3>
			<Apply regions={regions.filter(({ global }) => !global)} />
		</div>
	);
}

Member.page = { crumbs: [{ title: 'Bli medlem', regional: false }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [ApplyForMembershipDocument] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
