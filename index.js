const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:false, limit: '50mb'}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require('./passport-strategies/bearer');
require('./db/connect');
require('dotenv').config();

const apiAuth = require('./routes/Api.auth');
const apiCrudCompany = require('./routes/Api.company');
const apiCrudEvent = require('./routes/Api.event');
const apiCrudTag = require('./routes/Api.tag');
const apiCrudReservation = require('./routes/Api.reservation');

app.use('/api/v1', apiAuth);
app.use('/api/v1', apiCrudCompany);
app.use('/api/v1', apiCrudEvent);
app.use('/api/v1', apiCrudTag);
app.use('/api/v1', apiCrudReservation);

app.listen(process.env.port || 3000, function(){
  console.log('now listening for requests');
})