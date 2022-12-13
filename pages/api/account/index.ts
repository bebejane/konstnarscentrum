
import type { NextRequest, NextResponse } from 'next/server'
import { buildClient, buildBlockRecord } from '@datocms/cma-client'
import withAuthentication from '../../../lib/auth/withAuthentication'
import { apiQuery } from 'dato-nextjs-utils/api'
import { MemberDocument } from '/graphql'
export const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL, environment: 'dev' })

const imageBlockId = '1349197'

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

  const newRecord = {
    first_name: firstName,
    last_name: lastName,
    birth_place: birthPlace,
    bio,
    city,
    year_of_birth: yearOfBirth,
    webpage,
    instagram,
    member_category: memberCategory,
    content: content ? content.map(({ id, image }) => !id ?
      buildBlockRecord({
        item_type: { type: 'item_type', id: imageBlockId },
        image
      })
      :
      id
    )
      : undefined
  }

  await client.items.update(record.id, newRecord)
  const { member } = await apiQuery(MemberDocument, { variables: { email: record.email } })
  const resp = { content, member }
  return res.status(200).json(resp)
})

export const config = {
  //runtime: 'experimental-edge'
}