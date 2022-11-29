import s from "./[member].module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { MemberBySlugDocument, AllMembersWithPortfolioDocument, RelatedMembersDocument } from "/graphql";
import { Article, Block, MetaSection, RelatedSection, EditBox, Gallery } from "/components";
import { useEffect, useState } from "react";
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

	const [blocks, setBlocks] = useState()
	const { data, status } = useSession()

	const [imageId, setImageId] = useState<string | undefined>()
	const images = [image]
	content.forEach(({ image }) => image && images.push.apply(images, image))

	useEffect(() => {
		setBlocks(content)
	}, [content])

	return (
		<div className={s.container}>
			<Article
				image={image}
				title={`${firstName} ${lastName}`}
				text={bio}
				noBottom={true}
				editable={JSON.stringify({ ...image, type: image.__typename, image: [image] })}
				onClick={(id) => setImageId(id)}
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
				{(blocks || content)?.map((block, idx) =>
					<Block
						key={idx}
						data={block}
						onClick={(id) => setImageId(id)}
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
			<Gallery
				index={images.findIndex(({ id }) => id === imageId)}
				images={images}
				show={imageId !== undefined}
				onClose={() => setImageId(undefined)}
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