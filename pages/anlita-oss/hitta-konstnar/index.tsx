import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import {
	AllMemberCategoriesDocument,
	AllMembersWithPortfolioDocument,
	AllMembersCitiesDocument
} from "/graphql";
import { FilterBar, CardContainer, Card, Thumbnail, Loader, RevealText } from "/components";
import { apiQuery } from "dato-nextjs-utils/api";
import { useEffect, useState } from "react";

export type Props = {
	memberCategories: MemberCategoryRecord[]
	members: MemberRecord[],
	pagination: Pagination,
	regions: Region[],
	region: Region,
	cities: { name: string }[]
}

export default function Members({ members, memberCategories, cities, regions, region: regionFromProps, pagination }: Props) {

	const [results, setResults] = useState<MemberRecord[] | undefined>()
	const [error, setError] = useState<Error | undefined>()
	const [loading, setLoading] = useState<boolean>(false)
	const [query, setQuery] = useState<string | undefined>()
	const [regionId, setRegionId] = useState<string | undefined>(regionFromProps?.id)
	const [memberCategoryIds, setMemberCategoryIds] = useState<string | string[] | undefined>()

	useEffect(() => {
		const region = regions.find(({ id }) => id === regionId)
		const variables = {
			regionId: region && !region.global ? region.id : undefined,
			memberCategoryIds: memberCategoryIds?.length ? memberCategoryIds : undefined,
			query: query ? `${query.split(' ').filter(el => el).join('|')}` : undefined
		};

		if (!Object.keys(variables).filter(k => variables[k] !== undefined).length)
			return setResults(undefined)

		setLoading(true)

		fetch('/api/search', {
			body: JSON.stringify({ ...variables, type: 'member' }),
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(async (res) => setResults((await res.json()).members))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false))

	}, [query, regionId, memberCategoryIds, setResults])

	return (
		<div className={s.container}>
			<h1><RevealText>Hitta konstnärer</RevealText><sup className="amount">{pagination.count}</sup></h1>
			<div className={s.search}>
				<form className="mid">
					<span>Namn: </span>
					<input
						id="search"
						name="search"
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<span>Plats: </span>
					<select value={regionId} onChange={(e) => setRegionId(e.target.value)}>
						<option value={"false"}>Inte vald</option>
						{regions.map(({ id, name, global }, idx) =>
							<option key={idx} value={id}>{name}</option>
						)}
					</select>
				</form>
				<div className={s.background}></div>
			</div>
			<FilterBar
				multi={true}
				options={memberCategories.map(({ id, categoryType }) => ({ label: categoryType, id }))}
				onChange={(ids) => setMemberCategoryIds(ids)}
			/>
			{loading ?
				<Loader />
				: results ?
					<>
						{results.length === 0 && <>Vi hittade ingenting...</>}
						<CardContainer columns={3} className={s.results} key={Math.random()}>
							{results.map(({ id, firstName, lastName, image, region, slug }) =>
								<Card key={id}>
									<Thumbnail
										image={image}
										title={`${firstName} ${lastName}`}
										slug={`/anlita-oss/hitta-konstnar/${slug}`}
										regional={false}
									/>
								</Card>
							)}
						</CardContainer>
					</>
					:
					<>
						<CardContainer columns={3}>
							{members.map(({ id, firstName, lastName, image, region, slug }) =>
								<Card key={id}>
									<Thumbnail
										image={image}
										title={`${firstName} ${lastName}`}
										slug={`/anlita-oss/hitta-konstnar/${slug}`}
										regional={false}
									/>
								</Card>
							)}
						</CardContainer>
					</>
			}
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
	const { members, pagination } = await apiQuery(AllMembersWithPortfolioDocument, { variables: { regionId } })

	return {
		props: {
			...props,
			members,
			cities: props.cities.filter((v, i, a) => a.findIndex(v2 => (v2.name === v.name)) === i),
			pagination

		},
		revalidate
	};
});
