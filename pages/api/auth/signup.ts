import { validateSignUp, hashPassword } from '/lib/auth'
import { catchErrorsFrom } from '/lib/utils'
import client, { buildClient } from '/lib/client'

export default catchErrorsFrom(async (req, res) => {
  const { email, password, password2, firstName, lastName, roleId, ping } = req.body

  if (ping) return res.status(200).json({ pong: true });

  console.log({ email, password, password2, firstName, lastName, roleId, ping })

  try {

    validateSignUp({ email, password, password2, firstName, lastName })

    const memberExist = (await client.items.list({ filter: { type: "member", fields: { email: { eq: email } } } })).length > 0
    const accessToken = (await client.accessTokens.list()).find((t) => t.role.id === roleId)?.token
    const applications = await client.items.list({ filter: { type: "application", fields: { email: { eq: email } } } });
    const application = applications && applications.length ? applications[0] : undefined

    if (memberExist)
      throw 'Medlem med denna e-post adress finns redan'
    else if (!application)
      throw 'Det går ej att registerara sig utan att först ansöka om medlemskap'
    else if (!application.approved)
      throw 'Application has not been approved yet'
    else if (!accessToken)
      throw `Access token is empty`

    const models = await client.itemTypes.list()
    console.log(models);

    const applicationModelId = models.find(el => el.api_key === 'application').id
    const roleClient = buildClient({ apiToken: accessToken })
    const hashedPassword = await hashPassword(password)

    console.log({ applicationModelId });

    const member = await roleClient.items.create({
      item_type: {
        type: 'item_type',
        id: applicationModelId
      },
      firstName,
      lastName,
      email,
      password: hashedPassword,
      application: application.id,
      resettoken: null
    });

    return res.status(200).json(member)

  } catch (err) {
    console.log(req.body)
    console.error(err)
    const error = err.message || err
    return res.status(500).json({ error })
  }
})