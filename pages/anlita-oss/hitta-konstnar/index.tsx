import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { regions } from "/lib/region";
import { GetStaticProps } from "next";
import {
	AllMemberCategoriesDocument,
	AllMembersWithPortfolioDocument,
	AllMembersCitiesDocument,
	SearchMembersDocument,
	SearchMembersFreeDocument,
} from "/graphql";
import { FilterBar, CardContainer, Card, Thumbnail } from "/components";
import { apiQuery } from "dato-nextjs-utils/api";
import { useEffect, useState } from "react";

export type Props = {
	memberCategories: MemberCategoryRecord[]
	members: MemberRecord[],
	regions: Region[],
	cities: {
		name: string
	}[]
}

export default function RegionHome({ members, memberCategories, cities, regions }: Props) {

	const [results, setResults] = useState<MemberRecord[] | undefined>()
	const [query, setQuery] = useState<string | undefined>()
	const [city, setCity] = useState<string | undefined>()
	const [memberCategoryId, setMemberCategoryId] = useState<string | undefined>()

	useEffect(() => {

		const apiToken = process.env.NEXT_PUBLIC_SEARCH_GRAPHQL_TOKEN
		const variables = {
			city,
			memberCategoryId,
			query: query ? `${query.split(' ').filter(el => el).join('|')}` : undefined
		};

		apiQuery(query ? SearchMembersFreeDocument : SearchMembersDocument, { variables, apiToken })
			.then((res) => setResults(res.members))
			.catch((err) => console.error(err))

	}, [query, city, memberCategoryId, setResults])

	console.log(results);

	return (
		<div className={styles.container}>
			<h1>Hitta konstnärer</h1>
			<form>
				<span>Namn:</span>
				<input
					id="search"
					name="search"
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<span>Plats:</span>
				<select value={city} onChange={(e) => setCity(e.target.value)}>
					{cities.map(({ name }, idx) =>
						<option key={idx} value={name}>{name}</option>
					)}
				</select>
			</form>
			<FilterBar
				options={memberCategories.map(({ id, categoryType }) => ({ label: categoryType, id }))}
				onChange={(id) => setMemberCategoryId(id)}
			/>
			{results &&
				<>
					<h2>Sök resultat</h2>
					{results.length === 0 && <>Hittadet inget...</>}
					<CardContainer columns={3}>
						{results.map(({ id, firstName, lastName, image, region, slug }) =>
							<Card key={id}>
								<Thumbnail
									image={image}
									title={`${firstName} ${lastName}`}
									slug={`/anlita-oss/hitta-konstnar/${slug}`}
								/>
							</Card>
						)}
					</CardContainer>
				</>
			}
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
