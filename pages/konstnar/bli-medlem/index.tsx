import styles from "./index.module.scss";
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
		<div className={styles.container}>
			<h1>{title}</h1>
			<StructuredContent content={content} />
			<Apply regions={regions.filter(({ global }) => !global)} />
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [ApplyForMembershipDocument] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
