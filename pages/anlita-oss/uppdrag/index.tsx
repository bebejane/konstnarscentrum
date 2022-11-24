import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllCommissionsDocument, AllCommissionCategoriesDocument } from "/graphql";
import Link from "next/link";
import { Image as DatoImage } from 'react-datocms'
import { FilterBar, Thumbnail, ThumbnailContainer } from '/components'
import { useEffect, useState } from "react";

export type Props = {
	commissions: CommissionRecord[],
	commissionCategories: CommissionCategoryRecord[]
}

export default function RegionHome({ commissions, commissionCategories }: Props) {

	const [catgegory, setCategory] = useState<CommissionCategoryRecord | undefined>()

	return (
		<>
			<header>
				<h1>Uppdragsarkiv<sup className="amount">19</sup></h1>
				<FilterBar
					options={commissionCategories.map(({ id, title: label }) => ({ id, label }))}
					onChange={(id) => setCategory(commissionCategories.find(el => el.id === id))}
				/>

			</header>
			<ThumbnailContainer>
				{commissions.filter(({ category: { id } }) => !catgegory || catgegory.id === id).map(({ title, slug, image }, idx) =>
					<Thumbnail
						key={idx}
						image={image}
						title={title}
						slug={`/anlita-oss/uppdrag/${slug}`}
					/>
				)}
			</ThumbnailContainer>
		</>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllCommissionsDocument, AllCommissionCategoriesDocument] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
