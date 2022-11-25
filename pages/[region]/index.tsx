import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { regions } from "/lib/region";
import { apiQuery } from "dato-nextjs-utils/api";
import { RegionDocument, LatestNewsDocument } from "/graphql";
import { Block } from "/components";

export type Props = {
	regionStart: RegionRecord
}


export default function RegionHome({ regionStart }) {

	console.log(regionStart);

	return (
		<div className={s.container}>
			<h1>{regionStart.name}</h1>
			{regionStart.sections.map((block, idx) =>
				<Block key={idx} data={block} />
			)}
		</div>
	);
}

export async function getStaticPaths(context) {
	const paths = regions.map(({ slug }) => ({ params: { region: slug } }))
	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {


	const { region: regionStart }: { region: RegionRecord } = await apiQuery(RegionDocument, { variables: { regionId: props.region?.id } });
	const { news } = await apiQuery(LatestNewsDocument, { variables: { regionId: props.region?.id } });

	return {
		props: {
			...props,
			regionStart: {
				...regionStart,
				sections: regionStart.sections.map((section) => ({
					...section,
					news: section.__typename === 'LatestNewsRecord' ? news : null
				}))
			}
		},
		revalidate
	}
})