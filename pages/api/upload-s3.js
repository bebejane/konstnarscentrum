import Dato from '/lib/dato'

export default async function(req, res){
  let {filename} = req.body;
  filename = 'test.jpg'
  const s3 = await Dato.uploadRequest.create({filename})
  res.send({s3})
}