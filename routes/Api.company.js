const express = require('express');
const routes = express.Router();
 const passport = require('passport');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.resolve('./uploads')
    cb(null, folder)
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname)
    const filename = Date.now() + fileExtension
    cb(null, filename)
  }
})

function fileFilter(req, file, cb) {
  const fileExtension = path.extname(file.originalname)
  const acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif']

  cb(null, acceptedExtensions.includes(fileExtension))
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

const { createCompany, getCompanies, getCompanyById, update, deleteCompany } = require('../Controlers/Company');


routes.post('/Companies',
  [ passport.authenticate('bearer', {session: false}),
  upload.single('photo')], createCompany);

routes.get('/Companies',
  passport.authenticate('bearer', {session: false}),
  getCompanies);

routes.get('/Companies/:idCompany',
   passport.authenticate('bearer', {session: false}),
  getCompanyById);

routes.put('/Companies/:idCompany',
  [ passport.authenticate('bearer', {session: false}),
  upload.single('photo')], update);

routes.delete('/Companies/:idCompany',
   passport.authenticate('bearer', {session: false}),
  deleteCompany);

module.exports = routes;
