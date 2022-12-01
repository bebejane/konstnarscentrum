
import type { NextRequest, NextResponse } from 'next/server'
import { NextApiResponse, NextApiRequest } from 'next'
import { Session } from 'next-auth'
import { requireAuthentication, client } from '..'

export default requireAuthentication(async (req: NextApiRequest, res: NextApiResponse, session: Session) => {

  const { id, content } = req.body

  const record = await client.items.find(id, { nested: 'true' });
  /*
  const member = await client.items.update(record.id, {
    content: content.map(({ id }) => id)
  })
  */

  const resp = { content }
  return res.status(200).json(resp)
})

export const config = { /*runtime: 'experimental-edge'*/ }