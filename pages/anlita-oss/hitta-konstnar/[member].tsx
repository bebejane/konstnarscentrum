import s from "./[member].module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { MemberBySlugDocument, AllMembersWithPortfolioDocument, RelatedMembersDocument } from "/graphql";
import { Article, Block, MetaSection, RelatedSection, EditBox, Gallery } from "/components";
import { useEffect, useState, useCallback } from "react";
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
}, member, related }: Props) {

	const [imageId, setImageId] = useState<string | undefined>()
	const images = [image, ...content.filter(({ image }) => image).map(({ image }) => image)]
	const [blocks, setBlocks] = useState<MemberModelContentField[] | undefined>()
	const { data, status } = useSession()

	const handleSave = useCallback(async () => {
		console.log('save');
		const res = await fetch('/api/account', {
			method: 'POST',
			body: JSON.stringify({
				member: {
					...member,
					content: blocks
				},
			}),
			headers: { 'Content-Type': 'application/json' },
		})
		const newMember = await res.json()

		console.log(newMember);


	}, [blocks, member])

	useEffect(() => {
		setBlocks(content)
	}, [content])

	useEffect(() => {
		if (!blocks) return
		handleSave()
	}, [blocks, handleSave])

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

			<button className={s.addSection} onClick={() => setBlocks([...blocks, { __typename: 'ImageRecord', image: [] }])}>
				Lägg till sektion
			</button>

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

			<EditBox
				onChange={(blocks) => setBlocks(blocks)}
				onDelete={(id) => setBlocks(blocks.filter((block) => block.id !== id))}
				blocks={blocks}
			/>

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