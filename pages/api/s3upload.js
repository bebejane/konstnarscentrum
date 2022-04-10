import { Dato } from '/lib/dato/api'
import url from 'url'

export default async function(req, res){
  const {filename, token, s3url, id} = req.body;
  if(!s3url){
    const data = await Dato.uploadRequest.create({filename})
    res.send({s3url:data.url, id:data.id})
  }else{
    const u = s3url.split("?")[0]
    const path = await Dato.createUploadPath(u);
    const upload = await Dato.uploads.create({
      path,
      author: "API",
      tags:['application']
    });
    res.send({...upload})
  }  
}