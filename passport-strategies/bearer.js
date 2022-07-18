const passport = require('passport');
const bearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const Company = require('../models/company');

passport.use(new bearerStrategy((token, done)=>{
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  Company.findById(decodedToken.companyId, (err, user)=>{
    if(err){
      return done(err);
    }
    if(!user){
      return done(null, false);
    }
    return done(null, user, {scope: 'all'});
  })
}));