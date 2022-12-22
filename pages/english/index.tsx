import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { InEnglishDocument } from "/graphql";
import { StructuredContent } from "/components";

export type Props = {
	inEnglish: InEnglishRecord
}

export default function InEnglish({ inEnglish: { id, title, content } }: Props) {

	return (
		<div className={s.container}>
			<h1>{title}</h1>
			<StructuredContent id={id} content={content} />
		</div>
	);
}

InEnglish.page = { crumbs: [{ title: 'English', regional: false }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [InEnglishDocument] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	}
})