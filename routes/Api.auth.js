const express = require('express');
const routes = express.Router();

const {signup, login} = require('../Controlers/auth');

routes.post('/signup', signup);
routes.post('/login', login);

module.exports = routes;