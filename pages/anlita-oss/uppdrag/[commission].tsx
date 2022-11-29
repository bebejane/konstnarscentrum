import s from "./[commission].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { CommissionDocument, AllCommissionsDocument, RelatedCommissionsDocument } from "/graphql";
import type { GetStaticProps } from 'next'
import { Article, Block, MetaSection, RelatedSection, Gallery } from "/components";
import { useState } from "react";

type CommissionProps = {
	commission: CommissionRecord
	commissions: CommissionRecord[]
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
}, commissions }: CommissionProps) {

	const [imageId, setImageId] = useState<string | undefined>()
	const images = [image]
	content.forEach(({ image }) => image && images.push.apply(images, image))


	return (
		<div className={s.container}>
			<Article
				title={title}
				image={image}
				text={intro}
				onClick={(id) => setImageId(id)}
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
						<Block
							key={idx}
							data={block}
							onClick={(id) => setImageId(id)}
						/>
					)}
				</section>
			</Article>
			<RelatedSection
				title="Fler uppdrag"
				slug="/anlita-oss/uppdrag"
				items={commissions.map(({ title, image, slug }) => ({ title, image, slug: `/anlita-oss/uppdrag/${slug}` }))}
			/>
			<Gallery
				index={images.findIndex(({ id }) => id === imageId)}
				images={images}
				show={imageId !== undefined}
				onClose={() => setImageId(undefined)}
			/>
		</div>
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

	const regionId = props.region.global ? undefined : props.region.id;
	const slug = context.params.commission;
	const { commission } = await apiQuery(CommissionDocument, { variables: { slug } });
	const { commissions } = await apiQuery(RelatedCommissionsDocument, { variables: { regionId, commissionId: commission.id } });

	return {
		props: {
			...props,
			commission,
			commissions
		},
		revalidate
	};
});

