const passport = require('passport');
const bearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const Register = require('../models/register');

passport.use(new bearerStrategy((token, done)=>{
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  Register.findById(decodedToken.registerId, (err, register)=>{
    if(err){
      return done(err);
    }
    if(!register){
      return done(null, false);
    }
    return done(null, register, {scope: 'all'});
  })
}));