const express = require('express');
const routes = express.Router();
const passport = require('passport');

const { createEvent, getEvents, getEventById, update, deleteEvent } = require('../Controlers/CRUD.event');

routes.post('/Events',  passport.authenticate('bearer', {session: false}),createEvent);

routes.get('/Events',  passport.authenticate('bearer', {session: false}),getEvents);

routes.get('/Events/:idEvent',  passport.authenticate('bearer', {session: false}),getEventById);

routes.put('/Events/:idEvent',  passport.authenticate('bearer', {session: false}),update);

routes.delete('/Events/:idEvent',  passport.authenticate('bearer', {session: false}),deleteEvent);

module.exports = routes;