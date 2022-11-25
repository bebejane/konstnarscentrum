import s from "./[commission].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { CommissionDocument, AllCommissionsDocument } from "/graphql";
import type { GetStaticProps } from 'next'
import { Article, Block, MetaSection } from "/components";

type CommissionProps = {
	commission: CommissionRecord
}

export default function Commission({ commission: {
	title,
	image,
	intro,
	city,
	year,
	artist,
	consultant,
	content
} }: CommissionProps) {

	return (
		<>
			<Article
				title={title}
				image={image}
				text={intro}
			>
				<MetaSection
					items={[
						{ title: 'Plats', value: city },
						{ title: 'År', value: year },
						{ title: 'Konstnär', value: artist },
						{ title: 'Konsulent', value: consultant }
					]}
				/>
				<section className={s.documentation}>
					<h1 className="noPadding">Dokumentation</h1>
					{content.map((block, idx) =>
						<Block key={idx} data={block} />
					)}
				</section>
			</Article>
			<section className={s.related}>
				<header>
					<h1>Fler uppdrag</h1>
					<nav>Visa alla</nav>
				</header>
				<div className={s.background}></div>
			</section>
		</>
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

