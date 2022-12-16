import s from "./[commission].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { CommissionDocument, AllCommissionsDocument, RelatedCommissionsDocument } from "/graphql";
import type { GetStaticProps } from 'next'
import { Article, Block, MetaSection, RelatedSection, Gallery } from "/components";
import { useEffect, useState } from "react";
import { getStaticPagePaths } from '/lib/utils'
import { PageProps } from "/lib/context/page";
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
}, commissions }: CommissionProps) {

	const [setImages, setImageId] = useStore((state) => [state.setImages, state.setImageId])

	useEffect(() => {
		const images = [image, ...content.filter(({ image }) => image).reduce((imgs, { image }) => imgs = imgs.concat(image), [])]
		setImages(images)
	}, [content])

	return (
		<div className={s.container}>
			<Article
				key={id}
				title={`${title} i ${city}, ${year}`}
				image={image}
				text={intro}
				blackHeadline={blackHeadline}
				onClick={(id) => setImageId(id)}
			>
				<MetaSection
					items={[
						{ title: 'Plats', value: city },
						{ title: 'År', value: year },
						{ title: 'Konstnär', value: artist },
						{ title: 'Konsulent', value: consultant },
						{ title: 'Beställare', value: commissioner },
						{ title: 'Titel', value: work }
					]}
				/>
				<section className={s.documentation}>
					<h2 className="noPadding">Dokumentation</h2>
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
				key={id}
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

Commission.page = { noBottom: true } as PageProps

export async function getStaticPaths() {
	const p = await getStaticPagePaths(AllCommissionsDocument, 'commission')
	return p

}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const regionId = props.region.global ? undefined : props.region.id;
	const slug = context.params.commission;
	const { commission } = await apiQuery(CommissionDocument, { variables: { slug }, preview: context.preview });

	if (!commission)
		return { notFound: true }

	const { commissions } = await apiQuery(RelatedCommissionsDocument, {
		variables: {
			first: 100,
			regionId,
			commissionId: commission.id
		}
	});

	return {
		props: {
			...props,
			commission,
			commissions: commissions.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 5)
		},
		revalidate
	};
});

