import s from "./[commission].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { CommissionDocument, AllCommissionsDocument, RelatedCommissionsDocument } from "/graphql";
import type { GetStaticProps } from 'next'
import { Article, Block, MetaSection, RelatedSection } from "/components";
import { useEffect, useState } from "react";
import { getStaticPagePaths } from '/lib/utils'
import { useStore } from "/lib/store";

type CommissionProps = {
	commission: CommissionRecord
	commissions: CommissionRecord[]
}

export default function Commission({ commission: {
	id,
	title,
	blackHeadline,
	image,
	intro,
	city,
	year,
	artist,
	consultant,
	work,
	commissioner,
	content
}, commission, commissions }: CommissionProps) {

	const [setImages, setImageId] = useStore((state) => [state.setImages, state.setImageId])

	useEffect(() => {
		const images = [image, ...content.filter(({ image }) => image).reduce((imgs, { image }) => imgs = imgs.concat(image), [])]
		setImages(images)
	}, [content, image, setImages])

	return (
		<div className={s.container}>
			<Article
				id={id}
				key={id}
				title={`${title} i ${city}, ${year}`}
				image={image}
				text={intro}
				blackHeadline={blackHeadline}
				onClick={(id) => setImageId(id)}
			>
				<MetaSection
					items={[
						{ title: 'Konstnär', value: artist },
						{ title: 'År', value: year },
						{ title: 'Titel', value: work },
						{ title: 'Plats', value: city },
						{ title: 'Beställare', value: commissioner },
						{ title: 'Konsulent', value: consultant }
					]}
				/>
				<section className={s.documentation}>
					<h2 className="noPadding">Dokumentation</h2>
					{content.map((block, idx) =>
						<Block
							key={`${id}-${idx}`}
							data={block}
							record={commission}
							onClick={(id) => setImageId(id)}
						/>
					)}
				</section>
			</Article>
			<RelatedSection
				key={`${id}-related`}
				title="Fler uppdrag"
				slug="/anlita-oss/uppdrag"
				items={commissions.map(({ title, city, year, image, slug }) => ({
					title,
					subtitle: `${city} ${year}`,
					image,
					slug: `/anlita-oss/uppdrag/${slug}`
				}))}
			/>
		</div>
	);
}

Commission.page = {
	noBottom: true,
	crumbs: [{ slug: 'anlita-oss/uppdrag', title: 'Utvalda uppdrag' }],
	regional: true
} as PageProps

export async function getStaticPaths() {
	const p = await getStaticPagePaths(AllCommissionsDocument, 'commission')
	return p

}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const regionId = props.region.global ? undefined : props.region.id;
	const slug = context.params.commission;
	const { commission }: { commission: CommissionRecord } = await apiQuery(CommissionDocument, { variables: { slug }, preview: context.preview });

	if (!commission)
		return { notFound: true }

	const { commissions }: { commissions: CommissionRecord[] } = await apiQuery(RelatedCommissionsDocument, {
		variables: {
			first: 100,
			regionId,
			commissionId: commission.id,

		}
	});

	return {
		props: {
			...props,
			commission,
			commissions: commissions.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 6),
			pageTitle: commission.title
		},
		revalidate
	};
});

