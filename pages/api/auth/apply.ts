import { catchErrorsFrom } from '/lib/utils'
import client, { buildClient } from '/lib/client'
import { regions } from '/lib/region'

import Email from "/lib/emails";
import { generateToken } from '/lib/auth'
import { memberController, applicationController } from '/lib/controllers';

export default catchErrorsFrom(async (req, res) => {

  const { email, firstName, lastName, message, regionId, education, webpage } = req.body
  const memberExist = await memberController.exists(email)

  if (memberExist)
    throw 'Denna medlem finns redan!'

  const applicationExist = await applicationController.exists(email)

  if (applicationExist)
    throw 'Du har redan ansökt om medlemskap!'


  const tokens = await client.accessTokens.list();
  const region = regions.find(r => r.id === regionId)
  const roleApiToken = tokens.find((t) => t.role && t.role.id === region.roleId).token
  const approvalToken = await generateToken(email)
  const roleClient = buildClient({ apiToken: roleApiToken });

  const application = await roleClient.items.create({
    item_type: {
      type: 'item_type',
      id: process.env.DATOCMS_APPLICATION_MODEL_ID
    },
    email,
    first_name: firstName,
    last_name: lastName,
    education,
    webpage,
    message,
    approval_token: approvalToken,
    approved: false
  });
  await Email.applicationSubmitted({ email, name: firstName })
  res.status(200).json(application)
})