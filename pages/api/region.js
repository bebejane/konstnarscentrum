
import Cookies from 'cookies'
import districts from '/districts.json'

export default async function(req, res){
  const { district } = req.query
  const cookies = new Cookies(req, res)
  // Get a cookie
  console.log(cookies.get('district'))
  // Set a cookie
  cookies.set('district', district, {httpOnly: true})
  res.json({district})
}