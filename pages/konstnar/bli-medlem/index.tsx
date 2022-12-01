import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { regions } from "/lib/region";
import { Apply } from "/components";
import { ApplyForMembershipDocument } from "/graphql";
import { StructuredContent } from "/components";

export type Props = {
	apply: ApplyRecord
}

export default function Member({ apply: { content, title } }: Props) {

	return (
		<div className={s.container}>
			<h1>{title}</h1>
			<StructuredContent content={content} />
			<p className={s.form}>
				<Apply regions={regions.filter(({ global }) => !global)} />
			</p>
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [ApplyForMembershipDocument] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
