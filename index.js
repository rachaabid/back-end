const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

require('./passport-strategies/bearer');
require('./db/connect');
require('dotenv').config();

const apiAuth = require('./routes/Api.auth');
const apiCrudCompany = require('./routes/Api.company');
const apiCrudEvent = require('./routes/Api.event');
const apiCrudTag = require('./routes/Api.tag');

app.use('/api/v1', apiAuth);
app.use('/api/v1', apiCrudCompany);
app.use('/api/v1', apiCrudEvent);
app.use('/api/v1', apiCrudTag);

app.listen(process.env.port || 3000, function(){
  console.log('now listening for requests');
})