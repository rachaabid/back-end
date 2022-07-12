const express = require('express');
const routes = express.Router();
const passport = require('passport');

const { createTag, getTags, getTagById, update, deleteTag } = require('../Controlers/CRUD.tag');

routes.post('/Tags',  passport.authenticate('bearer', {session: false}),createTag);

routes.get('/Tags',  passport.authenticate('bearer', {session: false}),getTags);

routes.get('/Tags/:idTag',  passport.authenticate('bearer', {session: false}),getTagById);

routes.put('/Tags/:idTag',  passport.authenticate('bearer', {session: false}),update);

routes.delete('/Tags/:idTag',  passport.authenticate('bearer', {session: false}),deleteTag);

module.exports = routes;