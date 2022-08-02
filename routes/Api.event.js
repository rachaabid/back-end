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

const { createEvent, getEvents, getEventById, update, deleteEvent, getTagsForEvents } = require('../Controlers/Event');

routes.post('/Events', 
//  passport.authenticate('bearer', {session: false}), 
upload.single('photo'), createEvent);

routes.get('/Events',  
// passport.authenticate('bearer', {session: false}),
getEvents);

routes.get('/Events/:idEvent', 
//  passport.authenticate('bearer', {session: false}),
getEventById);

routes.put('/Events/:idEvent', 
//  passport.authenticate('bearer', {session: false}), 
upload.single('photo'), update);

routes.delete('/Events/:idEvent', 
//  passport.authenticate('bearer', {session: false}),
 deleteEvent);

 routes.get('/listTags',  
//  passport.authenticate('bearer', {session: false}),
 getTagsForEvents);

module.exports = routes;