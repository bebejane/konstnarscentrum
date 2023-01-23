import withAuthentication from '/lib/auth/withAuthentication'
import { apiQuery } from 'dato-nextjs-utils/api'
import { MemberDocument, MemberImagesDocument } from '/graphql'
import type { Session } from 'next-auth'

export default async function handler(req, res, session) {
  return res.status(200).json({ ping: 'pong' })
}

//export const config = {runtime: 'experimental-edge'}