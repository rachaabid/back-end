const express = require('express');
const routes = express.Router();
const passport = require('passport');

const { createCompany, getCompanys, getCompanyById, update, deleteCompany } = require('../Controlers/CRUD.Company');


routes.post('/Companys', passport.authenticate('bearer', {session: false}),createCompany);

routes.get('/Companys', passport.authenticate('bearer', {session: false}),getCompanys);

routes.get('/Companys/:idCompany', passport.authenticate('bearer', {session: false}),getCompanyById);

routes.put('/Companys/:idCompany', passport.authenticate('bearer', {session: false}),update);

routes.delete('/Companys/:idCompany', passport.authenticate('bearer', {session: false}),deleteCompany);

module.exports = routes;
