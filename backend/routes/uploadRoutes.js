import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/'); //cb is the callback, null is error and 'uploads/' is where we want the img to go to a folder called uploads in the root
    },
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); // path.extname(file.originalname means what ever extention the file has like .jpg or .png
    }
});
//need storage to tell where img to go. We can use amazonBuckets or diskStorage(on the server) ...

function fileFilter(req, file, cb) {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);
  
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Images only!'), false);
    }
  }

  const upload = multer({ storage, fileFilter }); //this is the function how to upload the img
  const uploadSingleImage = upload.single('image');


  router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
      if (err) {
        res.status(400).send({ message: err.message });
      }
  
      res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`,
      });
    });
  }); 
// upload.single('image') is the middleware we are using .single('image') means uploading a single img
//  in .single()  'image' its the fieldname hence ${file.fieldname} you can call the field name anything
//the actuall upload is handled by the middleware so dont have do do much to res


export default router; 