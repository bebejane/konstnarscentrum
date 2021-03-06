import catchErrorsFrom from '/lib/utils/catchErrorsFrom'
import { Dato } from '/lib/dato/api'
import { SiteClient } from 'datocms-client'

import Email from "/lib/utils/email";
import { generateToken } from '/lib/auth'
import { memberController, applicationController } from '/controllers';

const applicationModelId = "1185976"

export default catchErrorsFrom( async (req, res) => {
  
  const { email, firstName, lastName, message, roleId, roleSlug } = req.body
  const memberExist = await memberController.exists(email)
  if(memberExist) throw 'User already exists!'
  
  const applicationExist = await applicationController.exists(email)
  
  if(applicationExist) throw 'You have already applied for membership!'

  const tokens = await Dato.accessTokens.all();
  const roleAPIToken = tokens.filter((t) => t.role === roleId)[0].token
  const approvalToken =  await generateToken(email)
  const RoleClient = new SiteClient(roleAPIToken);
  
  const application = await RoleClient.items.create({
    itemType:applicationModelId,
    email,
    firstName,
    lastName,
    message,
    approvalToken,
    media:null,
    approved:false
  });
  await Email.sendApplicationEmail(email)
  res.status(200).json(application)
})