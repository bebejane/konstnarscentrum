
import type { NextRequest, NextResponse } from 'next/server'
import { buildClient, buildBlockRecord } from '@datocms/cma-client-node'
import withAuthentication from '/lib/auth/withAuthentication'
import { apiQuery } from 'dato-nextjs-utils/api'
import { MemberDocument } from '/graphql'
import camelToKebabCase from "camel-to-kebab";


export const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL, environment: process.env.GRAPHQL_ENVIRONMENT ?? 'main' })

const imageBlockId = '1349197'
const videoBlockId = '2021689'

const removeUndefined = (obj: any) => {
  if (!obj) return {}
  Object.keys(obj).forEach(k => obj[k] === undefined && delete obj[k])
  return obj
}

const convertCase = (obj) => {
  const newObj = {}
  Object.keys(obj).forEach(k => newObj[camelToKebabCase(k)] = obj[k])
  return newObj;
}

export default withAuthentication(async (req, res, session) => {

  const {
    id,
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
  } = req.body

  const record = await client.items.find(id, { nested: 'true' });

  if (!record)
    return res.status(500).json({ error: `User with id "${id}" not found!` })

  const images = []
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
    content: content ? content.map((block) =>
      buildBlockRecord({
        item_type: { type: 'item_type', id: block.__typename === 'ImageRecord' ? imageBlockId : videoBlockId },
        ...{
          ...block,
          __typename: undefined,
          type: undefined,
          index: undefined,
          image: block.__typename === 'ImageRecord' ? block.image?.map((i) => {
            images.push(i)
            return {
              title: i.title,
              alt: i.alt,
              upload_id: i.id,
              default_field_metadata: {
                en: {
                  alt: i.alt,
                  title: i.title,
                  custom_data: {},
                },
              },
            }
          }) : undefined,
          video: block.video ? {
            ...block.video,
            __typename: undefined,
            provider: 'youtube',
            provider_uid: 'youtube',
            providerUid: undefined,
            thumbnailUrl: undefined,
            width: 0,
            height: 0,
            thumbnail_url: 'https://localhost:3000',
          } : undefined
        },
      })
    )
      : undefined
  }

  //  console.log(JSON.stringify(newRecord, null, 2))

  try {
    Object.keys(newRecord).forEach(k => newRecord[k] === undefined && delete newRecord[k])
    await client.items.update(record.id, newRecord)
    await Promise.all(images.map(({ id, title, alt }) => client.uploads.update(id, {
      default_field_metadata: { en: { alt, title, custom_data: {} } },
    })))

    const { member } = await apiQuery(MemberDocument, { variables: { email: record.email } })
    console.log('updated', record.email)
    return res.status(200).json(member)

  } catch (err) {
    const apiError = err.response.body.data;
    const error = apiError.map(({ attributes: { details: { field, code, messages, message, errors } } }) => `${messages?.join('. ') || message}: ${Array.isArray(errors) ? errors?.join('. ') : errors} (${code})`)
    //console.error(JSON.stringify(apiError, null, 2));
    return res.status(500).json({ error })
  }

})

export const config = {
  //runtime: 'experimental-edge'
}