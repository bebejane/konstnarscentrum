import catchErrorsFrom from '/lib/utils/catchErrorsFrom'
import { Dato } from '/lib/dato/api'
import Email from "/lib/utils/email";
import { memberController } from '/controllers';
import { hashPassword, generateToken } from '/lib/auth'

export default catchErrorsFrom(async(req, res) => {
  const { email, token, password, password2 } = req.body
  const success = !token ? await requestReset(email) : await updatePassword(token, password, password2)
  return res.status(!success ? 500 : 200).json(!success ? {error:'User not found'} : {success:true})
})

const requestReset = async (email) => {
  const member = await memberController.get(email)
  if(!member) return false
  const resettoken =  await generateToken(email)
  const updatedMember = await Dato.items.update(member.id, {resettoken});
  await Email.sendResetPasswordEmail(email, resettoken)
  return true
}

const updatePassword = async (token, password, password2) => {
  const member = await memberController.getByPasswordToken(token)
  if(!member)
    return false
  const hashedPassword = await hashPassword(password)
  const updatedMember = await Dato.items.update(member.id, {
    resettoken:null, 
    password:hashedPassword
  });
  return true
}
