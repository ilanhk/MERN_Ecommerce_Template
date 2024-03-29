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

function checkFileType(file, cb){
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimeType);

    if (extname && mimeType){
        return cb(null, true);
    } else{
        cb('Images only!') //first arg in db is null which is an error. Here we are returning the error
    };

};

const upload = multer({
    storage,
});
//this is the function how to upload the img

router.post('/', upload.single('image'), (req, res)=> {
    res.send({
        message: 'Image uploaded',
        image: `/${req.file.path}`
    })
}); 
// upload.single('image') is the middleware we are using .single('image') means uploading a single img
//  in .single()  'image' its the fieldname hence ${file.fieldname} you can call the field name anything
//the actuall upload is handled by the middleware so dont have do do much to res


export default router; 