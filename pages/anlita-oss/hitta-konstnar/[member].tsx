import s from "./[member].module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { MemberBySlugDocument, AllMembersWithPortfolioDocument, RelatedMembersDocument } from "/graphql";
import { Article, Block, MetaSection, RelatedSection, EditBox } from "/components";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import useStore from "/lib/store";

export type Props = {
	member: MemberRecord,
	related: MemberRecord[],
	region: Region
}

export default function Member({ member: {
	id,
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
	content: contentFromProps
}, member, related }: Props) {

	const [setImages, setImageId] = useStore((state) => [state.setImages, state.setImageId])
	const [content, setContent] = useState<MemberModelContentField[] | undefined>()
	const { data, status } = useSession()
	const isEditable = (status === 'authenticated' && data.user.email === email)

	const handleSave = useCallback(async () => {

		if (JSON.stringify(member.content) === JSON.stringify(content) || status !== 'authenticated')
			return

		try {
			const res = await fetch('/api/account', {
				method: 'POST',
				body: JSON.stringify({
					id: member.id,
					content
				}),
				headers: { 'Content-Type': 'application/json' },
			})
			const newMember = await res.json()
			console.log(newMember);
		} catch (err) {
			console.log(err);
		}

	}, [status, content, member,])


	useEffect(() => {
		setContent(contentFromProps)
	}, [contentFromProps])


	useEffect(() => {
		if (!content) return
		const images = [image, ...content.filter(({ image }) => image).reduce((imgs, { image }) => imgs = imgs.concat(image), [])]
		setImages(images)
	}, [content, image, setImages])

	useEffect(() => {
		if (!content) return
		handleSave()
	}, [content, handleSave])


	return (
		<div className={s.container}>
			<Article
				key={id}
				image={image}
				title={`${firstName} ${lastName}`}
				text={bio}
				noBottom={true}
				editable={JSON.stringify({ ...image, type: image.__typename, image: [image] })}
				onClick={(id) => setImageId(id)}
			>
				<MetaSection
					key={`${id}-meta`}
					items={[
						{ title: 'Född', value: birthPlace },
						{ title: 'Verksam', value: city },
						{ title: 'Kontakt', value: email },
						{ title: 'Typ', value: memberCategory?.map(({ categoryType }) => categoryType).join(', ') },
						{ title: 'Besök', value: '' }
					]}
				/>

				<h2 className="noPadding">Utvalda verk</h2>
				{content?.map((block, idx) =>
					<Block
						key={`${id}-${idx}`}
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

			{isEditable &&
				<>
					<EditBox
						onChange={(content) => setContent(content)}
						onDelete={(id) => setContent(content.filter((block) => block.id !== id))}
						blocks={content}
					/>

					<button className={s.addSection} onClick={() => setContent([...content, { __typename: 'ImageRecord', image: [] }])}>
						Lägg till sektion
					</button>
				</>
			}
			<RelatedSection
				key={`${id}-related`}
				title="Upptäck fler konstnärer"
				slug={'/anlita-oss/hitta-konstnar'}
				regional={false}
				items={related.map(({ firstName, lastName, image, slug }) => ({
					title: `${firstName} ${lastName}`,
					image,
					slug: `/anlita-oss/hitta-konstnar/${slug}`
				}))}
			/>
		</div>
	);
}

Member.page = { noBottom: true } as PageProps

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
	const { member } = await apiQuery(MemberBySlugDocument, { variables: { slug }, preview: context.preview })
	const { members: related } = await apiQuery(RelatedMembersDocument, {
		variables: {
			first: 100,
			regionId,
			memberId: member.id
		},
		preview: context.preview
	})

	return {
		props: {
			...props,
			member,
			related: related.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 6)
		},
		revalidate
	};
});
