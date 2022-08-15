const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createTag, getTags, getTagById, update, deleteTag } = require('../Controlers/Tag');

router.post('/Tags',  
 passport.authenticate('bearer', {session: false}),
createTag);

router.get('/Tags',  
 passport.authenticate('bearer', {session: false}),
getTags);

router.get('/Tags/:idTag',  
 passport.authenticate('bearer', {session: false}),
getTagById);

router.put('/Tags/:idTag',  
 passport.authenticate('bearer', {session: false}),
update);

router.delete('/Tags/:idTag',  
 passport.authenticate('bearer', {session: false}),
deleteTag);

module.exports = router;