const express = require('express');
const routes = express.Router();
const passport = require('passport');

const { createReservation, getReservations, getReservationById, update, deleteReservation } = require('../Controlers/Reservation');

routes.post('/Reservations',  
 passport.authenticate('bearer', {session: false}),
createReservation);

routes.get('/Reservations',  
 passport.authenticate('bearer', {session: false}),
getReservations);

routes.get('/Reservations/:idReservation',  
 passport.authenticate('bearer', {session: false}),
getReservationById);

routes.put('/Reservations/:idReservation',  
 passport.authenticate('bearer', {session: false}),
update);

routes.delete('/Reservations/:idReservation',  
 passport.authenticate('bearer', {session: false}),
deleteReservation);

module.exports = routes;