
import withAuthentication from '/lib/auth/withAuthentication'
import { apiQuery } from 'dato-nextjs-utils/api'
import { MemberImagesDocument } from '/graphql'
import type { Session } from 'next-auth'
import { client, parseDatoError } from './'

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

export default withAuthentication(async (req, res, session) => {

  const { removeId } = req.query

  try {
    if (removeId)
      await client.uploads.destroy(removeId as string)
    const images = await userMediaLibrary(session)
    return res.status(200).json({ images })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: parseDatoError(err) })
  }
})

//export const config = {runtime: 'experimental-edge'}