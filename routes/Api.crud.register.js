const express = require('express');
const routes = express.Router();
const passport = require('passport');

const {createUser, getUsers, getUserById, update, deleteUser} = require('../Controlers/CRUD.Register');

routes.post('/Users', passport.authenticate('bearer', {session: false}), createUser);

routes.get('/Users', passport.authenticate('bearer', {session: false}), getUsers);

routes.get('/Users/:idUser', passport.authenticate('bearer', {session: false}), getUserById);

routes.put('/Users/:idUser', passport.authenticate('bearer', {session: false}), update);

routes.delete('/Users/:idUser', passport.authenticate('bearer', {session: false}), deleteUser);

module.exports = routes;