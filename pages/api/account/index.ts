
import withAuthentication from '/lib/auth/withAuthentication'
import { buildClient, buildBlockRecord } from '@datocms/cma-client'
import { apiQuery } from 'dato-nextjs-utils/api'
import { sleep } from '/lib/utils'
import { MemberDocument } from '/graphql'
import type { Item } from '@datocms/cma-client/dist/types/generated/SimpleSchemaTypes'
import { getYouTubeThumbnail } from 'yt-vimeo-thumbnail/dist/youtube/getYouTube'
import { getVimeoThumbnail } from 'yt-vimeo-thumbnail/dist/vimeo/getVimeo'

export const client = buildClient({
  apiToken: process.env.GRAPHQL_API_TOKEN_FULL,
  environment: process.env.DATOCMS_ENVIRONMENT ?? 'main'
})

export const parseDatoError = (err: any) => {
  const apiError = err.response?.body.data;
  if (!apiError) return err?.message ?? err

  const error = {
    _error: apiError,
    message: apiError.map(({ attributes: { details: { field, code, messages, message, errors }, details } }) => {
      const m = !messages ? undefined : (!Array.isArray(messages) ? [messages] : messages).join('. ')
      const d = (!Array.isArray(details) ? [details] : details)?.map(({ field_label, field_type, code }) => `${field_label} (${field_type}): ${code}`)
      return `${m ?? ''} ${d ?? ''}`

    }),
    codes: apiError.map(({ attributes: { code } }) => code),
  }
  return error
}

export default withAuthentication(async (req, res, session) => {

  if (!req.body || !req.body?.id)
    return res.status(500).json({ error: `Invalid empty request` })

  if (req.body.ping)
    return res.status(200).json({ pong: true })

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
  } = JSON.parse(req.body) as MemberRecord

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

  const images: FileField[] = [image];
  content?.forEach(el => el.__typename === 'ImageRecord' && el.image && images.push.apply(images, el.image))

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
    image: image ? { upload_id: image.id } : undefined,
    content: content ? content.map((block) =>
      buildBlockRecord({
        item_type: { type: 'item_type', id: block.__typename === 'ImageRecord' ? imageBlockId : videoBlockId },
        ...{
          ...block,
          __typename: undefined,
          type: undefined,
          index: undefined,
          image: block.__typename === 'ImageRecord' ? block.image?.map((i) => ({
            upload_id: i.id
          })
          ) : undefined,
          video: block.__typename === 'VideoRecord' && block.video ? {
            ...block.video || {},
            provider: block.video.provider,
            provider_uid: block.video.providerUid,
            thumbnail_url: block.video.provider === 'youtube' ? getYouTubeThumbnail(block.video.url) : getVimeoThumbnail(block.video.url),
            width: 0,
            height: 0,
            __typename: undefined,
            providerUid: undefined,
            thumbnailUrl: undefined,
          } : undefined
        },
      })
    )
      : undefined
  }

  // Remove undefined
  Object.keys(newRecord).forEach(k => newRecord[k] === undefined && delete newRecord[k])

  try {


    await Promise.all([
      client.items.update(record.id, newRecord),
      ...images.filter(i => i).map(({ id, title, alt }) =>
        client.uploads.update(id, {
          default_field_metadata: { en: { alt, title, custom_data: {} } },
        }))])

    await sleep(3000) // Sleept ot wait for GraphQL api to update
    const { member } = await apiQuery(MemberDocument, { variables: { email: record.email } })
    return res.status(200).json(member)

  } catch (err) {

    console.error(JSON.stringify(parseDatoError(err), null, 2))
    return res.status(500).json({ ...parseDatoError(err) })
  }
})

//export const config = {runtime: 'experimental-edge'}