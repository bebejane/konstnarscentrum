import { getSession } from "next-auth/react"

export default async function getServerSideProps(req, res){
  const session = await getSession({ req })
  return res.status(200).json({user:session?.user || null })
}
