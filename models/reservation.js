const mongoose = require('mongoose');
const { schema } = require('./company');
const Schema = mongoose.Schema;

const reservationSchema = new schema({
  firstName: {
    type: String,
    required: [true, 'Name fiels is required'],
},
lastName: {
    type: String,
     required: [true, 'Description is required'],
},
email: {
    type: String,
     required: [true, 'Description is required'],
},
},
{
  versionKey: false,
  timestamps: true
})

const Reservation = mongoose.model('reservation', reservationSchema);
module.exports = Reservation;