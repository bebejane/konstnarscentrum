
import type { NextRequest, NextResponse } from 'next/server'
import withAuthentication from '/lib/auth/withAuthentication'
import { apiQuery } from 'dato-nextjs-utils/api'
import { MemberImagesDocument } from '/graphql'

export default withAuthentication(async (req, res, session) => {
  const { member, uploads } = await apiQuery(MemberImagesDocument, {
    variables: { email: session.user.email },
    environment: process.env.GRAPHQL_ENVIRONMENT === 'dev' ? 'dev' : 'main'
  })
  const allImages = [...uploads, ...member.content.filter(({ image }) => image).reduce((imgs, { image }) => imgs = imgs.concat(image), [])]
  const images = []
  allImages.sort((a, b) => a.id > b.id ? 1 : -1).forEach(i => !images.find(({ id }) => i.id === id) && images.push(i))
  return res.status(200).json(images)
})

export const config = {
  //runtime: 'experimental-edge'
}