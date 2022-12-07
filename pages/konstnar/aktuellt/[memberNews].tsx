import styles from "./[memberNews].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { MemberNewsDocument, AllMemberNewsDocument } from "/graphql";
import { format } from "date-fns";
import { StructuredContent } from "/components";
import { getStaticPagePaths } from "/lib/utils";
import { Image } from "react-datocms";

export type Props = {
	memberNews: MemberNewsRecord,
	region: Region
}

export default function News({ memberNews: { date, title, content, image }, region }: Props) {

	return (
		<div className={styles.container}>
			<h1>{title}</h1>
			<h5>{format(new Date(date), "d MMMM y")} • {region.name}</h5>
			{image &&
				<Image
					className={styles.image}
					data={image.responsiveImage}
				/>
			}
			<StructuredContent content={content} />
		</div>
	);
}

export async function getStaticPaths() {
	return getStaticPagePaths(AllMemberNewsDocument, 'memberNews')
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.memberNews;
	const { memberNews } = await apiQuery(MemberNewsDocument, { variables: { slug }, preview: context.preview })

	if (!memberNews)
		return { notFound: true }

	return {
		props: {
			...props,
			memberNews
		},
	};
});

export const config = {
	//runtime:'experimental-edge'
}