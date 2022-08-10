const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'firstName fiels is required'],
},
lastName: {
    type: String,
     required: [true, 'lastName is required'],
},
email: {
    type: String,
     required: [true, 'Email is required'],
},
},
{
  versionKey: false,
  timestamps: true
})

const Reservation = mongoose.model('reservation', reservationSchema);
module.exports = Reservation;