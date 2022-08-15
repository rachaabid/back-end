const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.
    resolve('./uploads')
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

const upload = multer({ storage: storage, fileFilter: fileFilter})

const { createEvent, getEvents, getEventById, update, deleteEvent, getTagsForEvents, getNotStartedEvents } = require('../Controlers/Event');

router.post('/Events',  [passport.authenticate('bearer', {session: false}), 
upload.single('photo')], createEvent);

router.get('/Events',  
 passport.authenticate('bearer', {session: false}),
getEvents);

router.get('/Events/:idEvent', 
  passport.authenticate('bearer', {session: false}),
getEventById);

router.put('/Events/:idEvent', 
  [passport.authenticate('bearer', {session: false}), 
upload.single('photo')], update);

router.delete('/Events/:idEvent', 
  passport.authenticate('bearer', {session: false}),
 deleteEvent);

 router.get('/listTags',  
  passport.authenticate('bearer', {session: false}),
 getTagsForEvents);

 router.get('/EventsNotStarted', passport.authenticate('bearer', {session: false}), getNotStartedEvents)

module.exports = router;