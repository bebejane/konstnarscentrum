import catchErrorsFrom from '/lib/utils/catchErrorsFrom'
import { memberController } from '/controllers';
import { getSession } from "next-auth/react"

export default async function getStaticProps(req, res){
  //const session = await getSession(context)
  return res.status(200).json({user:'hej'})
}