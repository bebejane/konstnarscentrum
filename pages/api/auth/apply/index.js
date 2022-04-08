import catchErrorsFrom from '/lib/utils/catchErrorsFrom'
import Dato, { DatoClient } from '/lib/dato/api'
import Email from "/lib/utils/email";
import { generateToken } from '/lib/auth'
import { memberController } from '/controllers';

const applicationModelId = "1185976"

export default catchErrorsFrom( async (req, res) => {

  const { email, firstName, lastName, message, roleId } = req.body
  const memberExist = await memberController.exists(email)

  if(memberExist) throw 'User already exists!'
  
  const roleAPIToken = (await Dato.accessTokens.all()).filter((t) => t.role === roleId )[0].token
  const approvalToken =  await generateToken(email)
  const RoleClient = new DatoClient(roleAPIToken);
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