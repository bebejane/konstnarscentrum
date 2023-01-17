import s from "./[member].module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { MemberBySlugDocument, AllMembersWithPortfolioDocument, RelatedMembersDocument } from "/graphql";
import { Article, Block, MetaSection, RelatedSection, EditBox, EditBlock, Portfolio, Loader } from "/components";
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
	const [content, setContent] = useState<MemberModelContentField[] | undefined>(contentFromProps)
	const [block, setBlock] = useState<ImageRecord | VideoRecord | undefined>()
	const [error, setError] = useState<Error | undefined>()//(new Error('lots of errors'))
	const [saving, setSaving] = useState(false)
	const { data, status } = useSession()
	const isEditable = (status === 'authenticated' && data.user.email === email)

	const handleSave = useCallback(async (data, silent = false) => {
		silent = false
		if (status !== 'authenticated')
			return

		console.log('save content');
		const rollbackContent = [...content]
		!silent && setSaving(true)

		try {

			setContent(data)
			const res = await fetch('/api/account', {
				method: 'POST',
				body: JSON.stringify({
					id: member.id,
					content: data
				}),
				headers: { 'Content-Type': 'application/json' },
			})

			const updatedMember = await res.json()
			console.log(updatedMember);

			setContent(updatedMember.content)
		} catch (err) {
			console.error(err)
			setContent(rollbackContent)
			setError(err)
		}

		!silent && setSaving(false)

	}, [status, content, member])

	const handleBlockChange = (block) => {
		console.log('block change', block);

		handleSave(content.map((b) => b.id === block.id ? block : b))
	}
	const handleContentChange = (content) => {
		handleSave(content, true)
	}
	const handleRemove = (id) => {
		handleSave(content.filter((block) => block.id !== id), true)
	}

	useEffect(() => setContent(contentFromProps), [contentFromProps])
	useEffect(() => error && console.error(error), [error])

	//console.log(content);

	return (
		<div className={s.container}>
			<Article
				id={id}
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
				{(content)?.map((block, idx) =>
					<Block
						key={`${id}-${idx}`}
						data={block}
						recordId={id}
						onClick={(id) => setImageId(id)}
						editable={{
							...block,
							id: block.id,
							type: block.__typename,
							index: idx
						}} />
				)}
				{isEditable && !saving &&
					<>

						<Portfolio
							show={block !== undefined}
							block={block}
							setBlock={setBlock}
							content={content || contentFromProps}
							onContentChange={handleContentChange}
							onChange={handleBlockChange}
							onRemove={handleRemove}
							onClose={() => setBlock(undefined)}
							onSave={() => { }}
						/>

						{content?.filter((b) => (b.__typename === 'ImageRecord' && b.image.length === 0) || (b.__typename === 'VideoRecord' && !b.video)).map((block, idx) =>
							block.__typename === 'ImageRecord' ?
								<div className={s.newBlock} data-editable={JSON.stringify(block)}>
									<img src={'/images/noimage.svg'} />
								</div>
								:
								block.__typename === 'VideoRecord' ?
									<div className={s.newBlock} data-editable={JSON.stringify(block)}>
										Redigera video
									</div>
									: null
						)}

						<button
							className={s.addSection}
							onClick={() => handleSave([...content, { __typename: 'ImageRecord', image: [] }])}
						>
							Lägg till sektion
						</button>
					</>
				}
			</Article>

			{error &&
				<div className={s.overlay}>
					<div className={s.error}>
						<h3>Det uppstod ett fel</h3>
						<div className={s.message}>{error.message}</div>
						<button onClick={() => setError(undefined)}>Close</button>
					</div>

				</div>
			}

			{saving &&
				<div className={cn(s.overlay, s.transparent)}>
					<div className={s.loader}>
						<Loader />
					</div>
				</div>
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

Member.page = { noBottom: true, crumbs: [{ slug: 'anlita-oss/hitta-konstnar', title: 'Hitta konstnär', regional: true }] } as PageProps

export async function getStaticPaths(context) {
	const { members }: { members: MemberRecord[] } = await apiQuery(AllMembersWithPortfolioDocument)
	const paths = members.map(({ slug, region }) => ({ params: { member: slug, region: region.slug } }))

	return {
		paths,
		fallback: 'blocking',
	};
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const regionId = props.region.global ? undefined : props.region.id;
	const slug = context.params.member;
	const { member } = await apiQuery(MemberBySlugDocument, { variables: { slug }, preview: context.preview })

	if (!member)
		return { notFound: true }

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
