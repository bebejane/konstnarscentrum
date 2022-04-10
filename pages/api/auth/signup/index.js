import { validateSignUp, hashPassword } from '/lib/auth'
import catchErrorsFrom from '/lib/utils/catchErrorsFrom'
import { Dato, DatoClient } from '/lib/dato/api'

const applicationModelId = "1185543"

export default catchErrorsFrom( async(req, res) => {
  const  {email, password, password2, firstName, lastName, roleId } = req.body
  try{
    
    validateSignUp({email, password, password2, firstName, lastName})
    const memberExist = (await Dato.items.all({filter: {type: "member", fields: {email: {eq: email}}}})).length > 0
    const accessToken = (await Dato.accessTokens.all()).filter((t) => t.role === roleId)[0].token
    const applications = await Dato.items.all({filter: {type: "application",fields: {email: {eq: email }}}});
    const application = applications && applications.length ? applications[0] : undefined
    
    if(memberExist)
      throw 'Member already exist'
    else if(!application)
      throw 'You must apply before becoming a member'
    else if(!application.approved)
      throw 'Application has not been approved yet'
    else if(!accessToken)
      throw `Access token is empty`

    const hashedPassword = await hashPassword(password)
    const RoleClient = new DatoClient(accessToken);

    const member = await RoleClient.items.create({
      firstName,
      lastName,
      email,
      password:hashedPassword,
      application:application.id,
      resettoken:null,
      itemType:applicationModelId,
    });
    return res.status(200).json(member)

  }catch(err){
    console.error(err)
    const error = err.message || err
    return res.status(500).json({error})
  }
})