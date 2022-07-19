const express = require('express');
const routes = express.Router();
const passport = require('passport');

const { createCompany, getCompanies, getCompanyById, update, deleteCompany } = require('../Controlers/CRUD.Company');


routes.post('/Companies', passport.authenticate('bearer', {session: false}),createCompany);

routes.get('/Companies', passport.authenticate('bearer', {session: false}),getCompanies);

routes.get('/Companies/:idCompany', passport.authenticate('bearer', {session: false}),getCompanyById);

routes.put('/Companies/:idCompany', passport.authenticate('bearer', {session: false}),update);

routes.delete('/Companies/:idCompany', passport.authenticate('bearer', {session: false}),deleteCompany);

module.exports = routes;
