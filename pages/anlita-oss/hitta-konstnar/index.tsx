import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { AllMemberCategoriesDocument, AllMembersWithPortfolioDocument } from "/graphql";
import { apiQuery } from "dato-nextjs-utils/api";
import Link from "next/link";
import { FilterBar, ThumbnailContainer, Thumbnail } from "/components";

export type Props = {
	memberCategories: MemberCategoryRecord[]
	members: MemberRecord[],
	regions: Region[]
}

export default function RegionHome({ members, memberCategories, regions }: Props) {

	return (
		<div className={styles.container}>
			<h1>Hitta konstnärer</h1>
			<form>
				<span>Namn:</span>
				<input type="text" />
				<span>Plats:</span>
				<select>
					{memberCategories.map(({ id, categoryType }) =>
						<option key={id} value={id}>{categoryType}</option>
					)}
				</select>
			</form>
			<FilterBar
				options={memberCategories.map(({ id, categoryType }) => ({ label: categoryType, id }))}
				onChange={() => { }}
			/>
			<h2>Upptäck konstnärer</h2>
			<ThumbnailContainer>
				{members.map(({ id, firstName, lastName, image, region, slug }) =>
					<Thumbnail
						key={id}
						image={image}
						title={`${firstName} ${lastName}`}
						slug={`/${region.slug}/konstnar/${slug}`}
					/>
				)}
			</ThumbnailContainer>
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllMembersWithPortfolioDocument, AllMemberCategoriesDocument] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
