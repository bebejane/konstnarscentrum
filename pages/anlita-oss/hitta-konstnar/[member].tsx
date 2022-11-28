import s from "./[member].module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { MemberBySlugDocument, AllMembersWithPortfolioDocument, RelatedMembersDocument } from "/graphql";
import { Article, Block, MetaSection, RelatedSection, EditBox } from "/components";
import { useState } from "react";
import { useSession } from "next-auth/react";

export type Props = {
	member: MemberRecord,
	related: MemberRecord[],
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

}, related }: Props) {

	const [blocks, setBlocks] = useState(content)
	const { data, status } = useSession()

	return (
		<div className={s.container}>
			<Article
				image={image}
				title={`${firstName} ${lastName}`}
				text={bio}
				editable={JSON.stringify({ ...image, type: image.__typename, image: [image] })}
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
				{blocks?.map((block, idx) =>
					<Block
						key={idx}
						data={block}
						editable={{
							...block,
							id: block.id,
							type: block.__typename,
							index: idx
						}}
					/>
				)}
			</Article>
			<RelatedSection
				title="Upptäck fler konstnärer"
				slug={'/anlita-oss/hitta-konstnar'}
				items={related.map(({ firstName, lastName, image, slug }) => ({
					title: `${firstName} ${lastName}`,
					image,
					slug: `/anlita-oss/hitta-konstnar/${slug}`
				}))}
			/>
			<EditBox onChange={(blocks) => setBlocks(blocks)} blocks={blocks} />
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

	const regionId = props.region.global ? undefined : props.region.id;
	const slug = context.params.member;
	const { member } = await apiQuery(MemberBySlugDocument, { variables: { slug } })
	const { members: related } = await apiQuery(RelatedMembersDocument, { variables: { regionId, memberId: member.id } })

	return {
		props: {
			...props,
			member,
			related
		},
	};
});

export const config = {
	//runtime:'experimental-edge'
}