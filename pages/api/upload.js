import nextConnect from 'next-connect';
import multer from 'multer';
import Dato from '/lib/dato/api'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

const upload = multer({
  storage: multer.diskStorage({
    destination: '/tmp',
    filename: (req, file, cb) => cb(null, uuidv4()),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('theFiles'));
apiRoute.post(async (req, res) => {
  const paths = req.files.map(f => f.path)
  const uploads = await datoUpload(paths, res)
  res.end()
});

const datoUpload = async (paths, res) => {

  const emitProgress = (prog, res) => {
    res.write(JSON.stringify({...prog, t:new Date().getTime()}) + "###")
  }  
  const uploads = []
  for (let index = 0; index < paths.length; index++) { 
    const path = await Dato.createUploadPath(paths[index], {
      onProgress: (event) => {
        const { type, payload } = event;
        const totalProgress = ((index/paths.length)*100) + (payload.percent/paths.length) || 0
        switch (type) {
          case "uploadRequestComplete":
            emitProgress({status:"start", item:index+1, total:paths.length, percent:0, totalProgress, file:paths[index],images:uploads}, res)
            break;
          case "upload":
            emitProgress({status:"upload", item:index+1, total:paths.length, percent:payload.percent, totalProgress, file:paths[index],images:uploads}, res)
            break;
          default:
            break;
        }
      }
    });
    
    emitProgress({status:"processing", item:index+1, total:paths.length, percent:100, totalProgress: Math.ceil(((index+1)/paths.length)*100), file:paths[index], images:uploads}, res)
    const upload = await Dato.uploads.create({
      path,
      author: "New author!",
      copyright: "New copyright",
      tags:['application']
    });
    uploads.push(upload)
    fs.unlinkSync(paths[index])
    emitProgress({status:"processing", item:index+1, total:paths.length, percent:100, totalProgress: Math.ceil(((index+1)/paths.length)*100), file:paths[index], images:uploads}, res)
  }
  emitProgress({status:"done", item:paths.length, total:paths.length, percent:100, totalProgress:100, images:uploads}, res)
  return uploads
}
export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
    //bodyParser: {sizeLimit: '100mb'},
  },
};