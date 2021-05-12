const express = require("express");
const authenticate = require('../../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
    //req, file, cb callback
    destination:(req,file,cb)=>{
        //cb(error, destination folder)
        cb(null,'public/images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
    }
);
const imageFileFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('You can only upload files'),false);
    }
    else{
        cb(null,true)
    }
};

const upload = multer({storage:storage,fileFilter:imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(express.json());

uploadRouter.route('/',authenticate.verifyUser,authenticate.verifyAdmin)
.get((req,res,next)=>{
    res.statusCode=403;
    res.end("GET operation not supported on /imageUpload");
})
.post(upload.single('imageFile'),(req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(req.file);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end("PUT operation not supported on /imageUpload");
})
.delete((req,res,next)=>{
    res.statusCode=403;
    res.end("Delete operation not supported on /imageUpload");
})


module.exports = uploadRouter;