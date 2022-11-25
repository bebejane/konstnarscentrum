import s from "./[member].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { MemberBySlugDocument, AllMembersWithPortfolioDocument } from "/graphql";
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import { Article, Block, MetaSection } from "/components";

export type Props = {
	member: MemberRecord,
	region: Region
}

export default function Member({ member: {
	firstName,
	lastName,
	image,
	bio,
	yearOfBirth,
	birthPlace,
	memberCategory,
	region,
	email,
	city,
	content

} }: Props) {

	return (
		<div className={s.container}>
			<Article
				image={image}
				title={`${firstName} ${lastName}`}
				text={bio}
			>
				<MetaSection
					items={[
						{ title: 'Född', value: birthPlace },
						{ title: 'Verksam', value: city },
						{ title: 'Kontakt', value: email },
						{ title: 'Typ', value: memberCategory?.map(({ categoryType }) => categoryType).join(', ') },
						{ title: 'Besök', value: '' }
					]}
				/>
				<h1 className="noPadding">Utvalda verk</h1>
				{content?.map((block, idx) =>
					<Block key={idx} data={block} />
				)}
			</Article>
		</div>
	);
}

export async function getStaticPaths(context) {
	const { members }: { members: MemberRecord[] } = await apiQuery(AllMembersWithPortfolioDocument)

	const paths = members.map(({ slug, region }) => ({ params: { member: slug, region: region.slug } }))

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const slug = context.params.member;
	const { member } = await apiQuery(MemberBySlugDocument, { variables: { slug } })

	return {
		props: {
			...props,
			member
		},
	};
});

export const config = {
	//runtime:'experimental-edge'
}