import Cookies from 'cookies'
import { districts } from "/lib/district";

const handler = async (req, res) => {
  const { district } = req.query
  const cookies = new Cookies(req, res)
  // Get a cookie
  console.log(cookies.get('district'))
  // Set a cookie
  cookies.set('district', district, {httpOnly: true})
  res.json({district})
}

export default handler;