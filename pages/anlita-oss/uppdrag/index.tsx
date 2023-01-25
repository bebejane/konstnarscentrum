import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { AllCommissionsDocument, AllCommissionCategoriesDocument } from "/graphql";
import { FilterBar, Thumbnail, CardContainer, Card, RevealText } from '/components'
import { useState } from "react";
import { pageSize } from "/lib/utils";
import { apiQuery } from "dato-nextjs-utils/api";

export type Props = {
	commissions: CommissionRecord[],
	commissionCategories: CommissionCategoryRecord[],
	pagination: Pagination
}

export default function CommissionArchive({ commissions, commissionCategories, pagination }: Props) {
	const [category, setCategory] = useState<CommissionCategoryRecord | undefined>()

	return (
		<>
			<header className={s.header}>
				<h1><RevealText>Utvalda uppdrag</RevealText><sup className="amount">{pagination.count}</sup></h1>
				<FilterBar
					options={commissionCategories.map(({ id, title: label }) => ({ id, label }))}
					onChange={(id) => setCategory(commissionCategories.find(el => el.id === id))}
				/>
			</header>
			<CardContainer columns={3} key={category?.id}>
				{commissions.filter(({ category: { id } }) => !category || category.id === id).map(({ title, city, year, slug, image }, idx) =>
					<Card key={idx}>
						<Thumbnail
							key={idx}
							image={image}
							title={title}
							subtitle={`${city} ${year}`}
							slug={`/anlita-oss/uppdrag/${slug}`}
						/>
					</Card>
				)}
			</CardContainer>
		</>
	);
}

CommissionArchive.page = { crumbs: [{ title: 'Utvalda uppdrag', regional: true }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllCommissionCategoriesDocument] }, async ({ props, revalidate, context }: any) => {

	const page = parseInt(context.params?.page) || 1;
	const regionId = props.region.global ? undefined : props.region.id;
	const { commissions, pagination } = await apiQuery(AllCommissionsDocument, {
		variables: {
			regionId,
			first: 100
		}
	});

	return {
		props: {
			...props,
			commissions,
			pagination: {
				...pagination,
				page,
				size: pageSize
			}
		},
		revalidate
	};
});
