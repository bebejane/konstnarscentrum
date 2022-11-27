import s from "./index.module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { RegionDocument, LatestNewsDocument, LatestMemberNewsDocument } from "/graphql";
import { Block, Gallery, MenuDesktop } from "/components";
import type { Menu } from "/lib/menu";
export type Props = {
	regionStart: RegionRecord
	menu: Menu
}

export default function RegionHome({ regionStart, menu }: Props) {

	return (
		<div className={s.container}>
			<div className={cn(s.gallery, s.margins)}>
				<Gallery slides={regionStart.gallery} />
			</div>
			<MenuDesktop items={menu} />
			<div className={s.margins}>
				{regionStart.sections.map((block, idx) =>
					<Block key={idx} data={block} />
				)}
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {


	const { region: regionStart, news, memberNews }: {
		region: RegionRecord, news: NewsRecord[], memberNews: MemberNewsRecord[]
	} = await apiQuery([RegionDocument, LatestNewsDocument, LatestMemberNewsDocument], {
		variables: [
			{ regionId: props.region?.id },
			{ regionId: props.region?.id },
			{ regionId: props.region?.id }
		]
	});

	return {
		props: {
			...props,
			regionStart: {
				...regionStart,
				sections: regionStart.sections.map((section) => ({
					...section,
					news: section.__typename === 'LatestNewsRecord' ? news : null,
					memberNews: section.__typename === 'LatestMemberNewsRecord' ? memberNews : null
				}))
			}
		},
		revalidate
	}
})