const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination:  (req, file, cb)=> {
    cb(null, './uploads')
  },
  filename: (req, file, cb)=> {
    const fileExtension = path.extname(file.originalname)
    const filename = Date.now() + fileExtension
    cb(null, filename)
  }
})

function fileFilter (req, file, cb) {
  const fileExtension = path.extname(file.originalname)
  const acceptedExtensions  = ['.jpg', '.png', '.jpeg','.gif']

  cb(null, acceptedExtensions.includes(fileExtension))
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

const { uploadImage } = require('../Controlers/upload.controlers');

router.post('/upload-photo', upload.single('avatar'), uploadImage);

module.exports = router;