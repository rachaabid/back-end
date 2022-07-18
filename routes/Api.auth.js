const express = require('express');
const routes = express.Router();

const {signup, login, forgotPassword, resetPassword} = require('../Controlers/auth');

routes.post('/signup', signup);
routes.post('/login', login);

routes.post('/forgotPassword', forgotPassword);
routes.post('/resetPassword/:resetToken', resetPassword);

module.exports = routes;