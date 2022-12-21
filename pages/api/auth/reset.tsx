import { catchErrorsFrom } from '/lib/utils'
import client from '/lib/client'
import { Email } from "/lib/emails";
import { memberController } from '/lib/controllers';
import { hashPassword, generateToken } from '/lib/auth'

export default catchErrorsFrom(async (req, res) => {
  const { email, token, password, password2 } = req.body
  const success = !token ? await requestReset(email) : await updatePassword(token, password, password2)
  return res.status(!success ? 500 : 200).json(!success ? { error: 'User not found' } : { success: true })
})

const requestReset = async (email) => {
  const member = await memberController.get(email)

  if (!member)
    return false

  const token = await generateToken(email)
  const updatedMember = await client.items.update(member.id, { resettoken: token });
  await Email.resetPassword({ email, token })
  return true
}

const updatePassword = async (token, password, password2) => {
  const member = await memberController.getByPasswordToken(token)
  if (!member)
    return false
  const hashedPassword = await hashPassword(password)
  const updatedMember = await client.items.update(member.id, {
    resettoken: null,
    password: hashedPassword
  });
  return true
}
