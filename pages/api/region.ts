import Cookies from 'cookies'
import { regions } from "/lib/region";

const handler = async (req, res) => {
  const { region } = req.query
  const cookies = new Cookies(req, res)
  // Get a cookie
  console.log(cookies.get('region'))
  // Set a cookie
  cookies.set('region', region, { httpOnly: true })
  res.json({ region })
}

export default handler;