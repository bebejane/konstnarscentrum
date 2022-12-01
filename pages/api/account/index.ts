
import type { NextRequest, NextResponse } from 'next/server'
import { buildClient, buildBlockRecord } from '@datocms/cma-client-node'
import withAuthentication from '../../../lib/auth/withAuthentication'
import { apiQuery } from 'dato-nextjs-utils/api'
import { MemberDocument } from '/graphql'

const imageBlockId = '1349197'

export const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL, environment: 'dev' })

export default withAuthentication(async (req, res, session) => {

  const { member: { id, content } } = req.body

  const record = await client.items.find(id, { nested: 'true' });
  await client.items.update(record.id, {
    content: content.map(({ id, image }) => !id ?
      buildBlockRecord({
        item_type: { type: 'item_type', id: imageBlockId },
        image
      })
      :
      id

    )
  })
  const { member } = await apiQuery(MemberDocument, { variables: { email: record.email } })
  const resp = { content, member }
  return res.status(200).json(resp)
})

export const config = { /*runtime: 'experimental-edge'*/ }