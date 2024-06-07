import { validateSignUp, hashPassword } from '/lib/auth'
import { regions } from '/lib/region'
import { catchErrorsFrom, parseDatoError } from '/lib/utils'
import client, { buildClient } from '/lib/client'
import slugify from 'slugify';

export default catchErrorsFrom(async (req, res) => {
  const { email, password, password2, firstName, lastName, regionId, ping } = req.body

  if (ping) return res.status(200).json({ pong: true });

  validateSignUp({ email, password, password2, firstName, lastName })

  const region = regions.find(el => el.id === regionId)
  const memberExist = (await client.items.list({ filter: { type: "member", fields: { email: { eq: email } } } })).length > 0
  const accessTokens = await client.accessTokens.list()
  const accessToken = accessTokens.find((t) => t.role?.id === region.roleId).token
  const applications = await client.items.list({ filter: { type: "application", fields: { email: { eq: email } } } });
  const application = applications && applications.length ? applications[0] : undefined

  if (memberExist)
    throw 'Medlem med den här e-post adressen finns redan.'
  else if (!application)
    throw 'Det går ej att registerara sig utan att först ansöka om medlemskap.'
  else if (!application.approved)
    throw 'Din ansökan är inte godkänd än.'
  else if (!accessToken)
    throw `Access token is empty`

  const models = await client.itemTypes.list()
  const memberModelId = models.find(el => el.api_key === 'member').id

  const roleClient = buildClient({ apiToken: accessToken, environment: process.env.DATOCMS_ENVIRONMENT ?? 'main' })
  const hashedPassword = await hashPassword(password)

  let slug = slugify(`${firstName} ${lastName}`, { lower: true, trim: true, strict: true })

  for (let i = 0; (await client.items.list({ filter: { type: "member", fields: { slug: { eq: slug } } } })).length > 0; i++) {
    slug = slugify(`${firstName} ${lastName} ${i + 2}`, { lower: true, trim: true, strict: true })
  }

  const member = await roleClient.items.create({
    item_type: {
      type: 'item_type',
      id: memberModelId
    },
    first_name: firstName,
    last_name: lastName,
    full_name: `${firstName} ${lastName}`,
    region: regionId,
    slug,
    email,
    password: hashedPassword,
    application: application.id,
    resettoken: undefined
  });

  try {
    await client.items.update(member.id, { creator: { type: 'user', id: region.userId } })
  } catch (err) {
    res.status(500).json({ error: parseDatoError(err) });
  }
  return res.status(200).json(member)

})