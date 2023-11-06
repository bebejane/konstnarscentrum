
import withAuthentication from '/lib/auth/withAuthentication'
import { apiQuery } from 'dato-nextjs-utils/api'
import { MemberImagesDocument } from '/graphql'
import type { Session } from 'next-auth'
import { client } from './'
import { sleep, parseDatoError } from '/lib/utils'

const userMediaLibrary = async (session: Session) => {
  const { member, uploads } = await apiQuery(MemberImagesDocument, {
    variables: { email: session.user.email },
    environment: process.env.DATOCMS_ENVIRONMENT ?? 'main'
  })
  const allImages = [...member.content.filter(({ image }) => image).reduce((imgs, { image }) => imgs = imgs.concat(image), []), ...uploads]
  const images = []
  allImages.sort((a, b) => a.id > b.id ? 1 : -1).forEach(i => !images.find(({ id }) => i.id === id) && images.push(i))
  return images
}

export default withAuthentication(async (req, res, session) => {

  const { removeId, ping } = req.query

  if (ping)
    return res.status(200).json({ pong: true })

  try {
    if (removeId) {
      await client.uploads.destroy(removeId as string)
      await sleep(3000)
    }
    const images = await userMediaLibrary(session)
    return res.status(200).json({ images })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: parseDatoError(err) })
  }
})