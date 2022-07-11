const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

require('./passport-strategies/bearer');
require('./db/connect');
require('dotenv').config();

const apiSignupLogin = require('./routes/Api.register.login');
const apiCrudRegister = require('./routes/Api.crud.register');

app.use('/api/v1', apiSignupLogin);
app.use('/api/v1', apiCrudRegister);

app.listen(process.env.port || 3000, function(){
  console.log('now listening for requests');
})