import { validateSignUp, hashPassword } from '/lib/auth'
import { catchErrorsFrom } from '/lib/utils'
import client, { buildClient } from '/lib/client'


export default catchErrorsFrom(async (req, res) => {
  const { email, password, password2, firstName, lastName, roleId } = req.body
  try {

    validateSignUp({ email, password, password2, firstName, lastName })

    const memberExist = (await client.items.list({ filter: { type: "member", fields: { email: { eq: email } } } })).length > 0
    const accessToken = (await client.accessTokens.list()).filter((t) => t.role === roleId)[0].token
    const applications = await client.items.list({ filter: { type: "application", fields: { email: { eq: email } } } });
    const application = applications && applications.length ? applications[0] : undefined

    if (memberExist)
      throw 'Member already exist'
    else if (!application)
      throw 'You must apply before becoming a member'
    else if (!application.approved)
      throw 'Application has not been approved yet'
    else if (!accessToken)
      throw `Access token is empty`

    const roleClient = buildClient({apiToken:accessToken})
    const hashedPassword = await hashPassword(password)
    const member = await roleClient.items.create({
      item_type: { 
        type: 'item_type', 
        id: process.env.DATOCMS_APPLICATION_MODEL_ID 
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
    console.error(err)
    const error = err.message || err
    return res.status(500).json({ error })
  }
})