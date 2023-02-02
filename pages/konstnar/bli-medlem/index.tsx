import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { regions } from "/lib/region";
import { Apply } from "/components";
import { ApplyForMembershipDocument } from "/graphql";
import { Article } from "/components";
import { useState } from "react";

export type Props = {
	apply: ApplyRecord
}

export default function Member({ apply: { id, content, title, intro, image } }: Props) {

	const [application, setApplication] = useState<ApplicationRecord | undefined>()

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
			{!application && <h3>Skicka in ansökan</h3>}
			<Apply
				regions={regions.filter(({ global }) => !global)}
				onSuccess={(application) => setApplication(application)}
			/>
		</div>
	);
}

Member.page = { title: 'Bli medlem', crumbs: [{ title: 'Bli medlem', regional: false }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [ApplyForMembershipDocument] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
