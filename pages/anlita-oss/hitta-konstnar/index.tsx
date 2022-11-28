import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { regions } from "/lib/region";
import { GetStaticProps } from "next";
import { AllMemberCategoriesDocument, AllMembersWithPortfolioDocument, AllMembersCitiesDocument } from "/graphql";
import { FilterBar, CardContainer, Card, Thumbnail } from "/components";
import { apiQuery } from "dato-nextjs-utils/api";

export type Props = {
	memberCategories: MemberCategoryRecord[]
	members: MemberRecord[],
	regions: Region[],
	cities: {
		name: string
	}[]
}

export default function RegionHome({ members, memberCategories, cities, regions }: Props) {

	return (
		<div className={styles.container}>
			<h1>Hitta konstnärer</h1>
			<form>
				<span>Namn:</span>
				<input type="text" />
				<span>Plats:</span>
				<select>
					{cities.map(({ name }, idx) =>
						<option key={idx} value={name}>{name}</option>
					)}
				</select>
			</form>
			<FilterBar
				options={memberCategories.map(({ id, categoryType }) => ({ label: categoryType, id }))}
				onChange={() => { }}
			/>
			<h2>Upptäck konstnärer</h2>
			<CardContainer columns={3}>
				{members.map(({ id, firstName, lastName, image, region, slug }) =>
					<Card key={id}>
						<Thumbnail
							image={image}
							title={`${firstName} ${lastName}`}
							slug={`/anlita-oss/hitta-konstnar/${slug}`}
						/>
					</Card>
				)}
			</CardContainer>
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({
	queries: [
		AllMemberCategoriesDocument,
		AllMembersCitiesDocument
	]
}, async ({ props, revalidate }: any) => {

	const regionId = !props.region.global ? props.region.id : undefined
	const { members } = await apiQuery(AllMembersWithPortfolioDocument, { variables: { regionId } })

	return {
		props: {
			...props,
			members
		},
		revalidate
	};
});
