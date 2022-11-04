import { catchErrorsFrom } from '/lib/utils'
import client, { buildClient } from '/lib/client'

import Email from "../../../lib/email";
import { generateToken } from '/lib/auth'
import { memberController, applicationController } from '/lib/controllers';

export default catchErrorsFrom( async (req, res) => {
  
  const { email, firstName, lastName, message, roleId, roleSlug } = req.body
  const memberExist = await memberController.exists(email)

  if(memberExist) 
    throw 'User already exists!'
  
  const applicationExist = await applicationController.exists(email)
  
  if(applicationExist) 
    throw 'You have already applied for membership!'

  const tokens = await client.accessTokens.list();
  const roleApiToken = tokens.find((t) => t.role && t.role.id === roleId).token
  const approvalToken =  await generateToken(email)
  const roleClient = buildClient({apiToken:roleApiToken});
  
  const application = await roleClient.items.create({
    item_type: { 
      type: 'item_type', 
      id: process.env.DATOCMS_APPLICATION_MODEL_ID 
    },
    email,
    first_name:firstName,
    last_name:lastName,
    message,
    approval_token: approvalToken,
    approved: false
  });
  await Email.sendApplicationEmail(email)
  res.status(200).json(application)
})