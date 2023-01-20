
import { buildClient, buildBlockRecord } from '@datocms/cma-client'
import withAuthentication from '/lib/auth/withAuthentication'
import { apiQuery } from 'dato-nextjs-utils/api'
import { MemberDocument, MemberImagesDocument } from '/graphql'
import type { Session } from 'next-auth'
import type { Item } from '@datocms/cma-client/dist/types/generated/SimpleSchemaTypes'

export const client = buildClient({
  apiToken: process.env.GRAPHQL_API_TOKEN_FULL,
  environment: process.env.GRAPHQL_ENVIRONMENT ?? 'main'
})

const userMediaLibrary = async (session: Session) => {
  const { member, uploads } = await apiQuery(MemberImagesDocument, {
    variables: { email: session.user.email },
    environment: process.env.GRAPHQL_ENVIRONMENT ?? 'main'
  })
  const allImages = [...member.content.filter(({ image }) => image).reduce((imgs, { image }) => imgs = imgs.concat(image), []), ...uploads]
  const images = []
  allImages.sort((a, b) => a.id > b.id ? 1 : -1).forEach(i => !images.find(({ id }) => i.id === id) && images.push(i))
  return images
}

const parseDatoError = (err: any) => {
  const apiError = err.response?.body.data;
  if (!apiError) return err?.message ?? err
  const error = apiError.map(({ attributes: { details: { field, code, messages, message, errors } } }) => `${messages?.join('. ') || message}: ${Array.isArray(errors) ? errors?.join('. ') : errors} (${code})`)
  return error
}

export default withAuthentication(async (req, res, session) => {

  const { medialibrary, ping } = req.query;

  if (ping)
    return res.status(200).json({ ping })

  if (medialibrary) {
    try {
      const images = await userMediaLibrary(session)
      return res.status(200).json({ images })
    } catch (err) {
      return res.status(500).json({ error: parseDatoError(err) })
    }
  }

  if (!req.body || !req.body?.id)
    return res.status(500).json({ error: `Invalid empty request` })

  const {
    id,
    image,
    content,
    firstName,
    lastName,
    bio,
    birthPlace,
    city,
    yearOfBirth,
    webpage,
    instagram,
    memberCategory
  } = req.body as MemberRecord

  let record: Item;
  let imageBlockId: string
  let videoBlockId: string

  try {
    const res = await Promise.all([
      client.items.find(id, { nested: 'true' }),
      client.itemTypes.list()
    ])
    record = res[0]
    imageBlockId = res[1]?.find(el => el.api_key === 'image')?.id
    videoBlockId = res[1]?.find(el => el.api_key === 'video')?.id
    if (!imageBlockId || !videoBlockId)
      throw new Error('Cant find image/video block ids')
  } catch (err) {
    return res.status(500).json({ error: parseDatoError(err) })
  }

  if (!record)
    return res.status(500).json({ error: `User with id "${id}" not found!` })

  const newRecord = {
    first_name: firstName,
    last_name: lastName,
    full_name: firstName && lastName ? `${firstName} ${lastName}` : undefined,
    birth_place: birthPlace,
    bio,
    city,
    year_of_birth: yearOfBirth,
    webpage,
    instagram,
    member_category: memberCategory,
    image: image ? {
      upload_id: image.id, title: image.title, default_field_metadata: {
        en: {
          alt: image.alt,
          title: image.title,
          custom_data: image.customData || {},
        },
      },
    } : undefined,
    content: content ? content.map((block) =>
      buildBlockRecord({
        item_type: { type: 'item_type', id: block.__typename === 'ImageRecord' ? imageBlockId : videoBlockId },
        ...{
          ...block,
          __typename: undefined,
          type: undefined,
          index: undefined,
          image: block.__typename === 'ImageRecord' ? block.image?.map((i) => ({
            title: i.title,
            alt: i.alt,
            upload_id: i.id,
            default_field_metadata: {
              en: {
                alt: i.alt,
                title: i.title,
                custom_data: i.customData || {},
              },
            },
          })
          ) : undefined,
          video: block.__typename === 'VideoRecord' && block.video ? {
            ...block.video,
            __typename: undefined,
            provider: block.video.provider,
            provider_uid: block.video.providerUid,
            providerUid: undefined,
            thumbnailUrl: undefined,
            width: 0,
            height: 0,
            thumbnail_url: 'https://youtube.com',
          } : undefined
        },
      })
    )
      : undefined
  }

  // Remove undefined
  Object.keys(newRecord).forEach(k => newRecord[k] === undefined && delete newRecord[k])

  try {
    await client.items.update(record.id, newRecord)
    const { member } = await apiQuery(MemberDocument, { variables: { email: record.email } })
    console.log('updated', record.email)
    return res.status(200).json(member)

  } catch (err) {
    return res.status(500).json({ error: parseDatoError(err) })
  }
})

//export const config = {runtime: 'experimental-edge'}