import s from "./[commission].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { CommissionDocument, AllCommissionsDocument } from "/graphql";
import type { GetStaticProps } from 'next'
import { Article, Block } from "/components";

type CommissionProps = {
	commission: CommissionRecord
}

export default function Commission({ commission: { title, image, intro, city, year, artist, consultant, content } }: CommissionProps) {

	return (
		<Article
			title={title}
			image={image}
			text={intro}
		>
			<section className={s.meta}>
				<ul className="small">
					<li><span>Plats:</span>{city}</li>
					<li><span>År:</span>{year}</li>
					<li><span>Konstnär:</span>{artist}</li>
					<li><span>Konsulent:</span>{consultant}</li>
				</ul>
			</section>
			<section className={s.documentation}>
				<h1 className="noPadding">Dokumentation</h1>
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

