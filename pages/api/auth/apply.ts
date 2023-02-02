import { catchErrorsFrom } from '/lib/utils'
import { NextApiRequest, NextApiResponse } from "next";
import client, { buildClient } from '/lib/client'
import { regions } from '/lib/region'
import { Email } from "/lib/emails";
import { generateToken } from '/lib/auth'
import { memberController, applicationController } from '/lib/controllers';

export default catchErrorsFrom(async (req: NextApiRequest, res: NextApiResponse) => {

  if (!req.body) {
    console.log(req);
    throw 'Ogiltig request'
  }

  const { email, firstName, lastName, message, regionId, education, webpage, pdf, ping } = req.body

  if (ping) return res.status(200).json({ pong: true })

  const memberExist = await memberController.exists(email)

  if (memberExist)
    throw 'Medlem med med samma e-post adress finns redan'

  const applicationExist = await applicationController.exists(email)

  if (applicationExist)
    throw 'Du har redan skickat in din ansökning om medlemskap'

  const tokens = await client.accessTokens.list();
  const models = await client.itemTypes.list()
  const applicationModelId = models.find(el => el.api_key === 'application').id

  if (!applicationModelId)
    throw 'Cat\'t find application model id'

  const region = regions.find(r => r.id === regionId)
  const roleApiToken = tokens.find((t) => t.role && t.role.id === region.roleId).token
  const approvalToken = await generateToken(email)
  const roleClient = buildClient({ apiToken: roleApiToken, environment: process.env.DATOCMS_ENVIRONMENT ?? 'main' });

  const application = await roleClient.items.create({
    item_type: { type: 'item_type', id: applicationModelId },
    email,
    first_name: firstName,
    last_name: lastName,
    education,
    webpage,
    message,
    pdf,
    region: region.id,
    approval_token: approvalToken,
    approved: false
  });
  await Email.applicationSubmitted({ email, name: firstName })
  res.status(200).json(application)
})