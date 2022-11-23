import s from "./[commission].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { CommissionDocument, AllCommissionsDocument } from "/graphql";
import type { GetStaticProps } from 'next'
import { Article, Block } from "/components";

type CommissionProps = {
	commission: CommissionRecord
}

export default function Commission({ commission: { title, image, intro, content } }: CommissionProps) {

	return (
		<Article
			title={title}
			image={image}
			text={intro}
		>
			<section className={s.documentation}>
				<h2>Dokumentation</h2>
				{content.map((block, idx) =>
					<Block key={idx} data={block} />
				)}
			</section>
		</Article>
	);
}

export async function getStaticPaths() {
	const { commissions } = await apiQuery(AllCommissionsDocument)
	const paths = commissions.map(({ slug }) => ({ params: { commission: slug } }));

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.commission;
	const { commission } = await apiQuery(CommissionDocument, { variables: { slug } });

	return {
		props: {
			...props,
			commission
		},
		revalidate
	};
});

