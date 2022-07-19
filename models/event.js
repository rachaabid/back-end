const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventName: {
    type: String,
    required: [true, 'Event Name is required']
  },
    eventDescription: {
      type: String,
      required: [true, 'Event Description is required']
    },
    startDate: {
      type: String,
      required: [true, 'Date is required']
    },
    endDate: {
      type: String,
      required: [true, 'Date is required']
    },
    startTime: {
      type: String,
      required: [true, 'Time is required']
    },
    endTime: {
      type: String,
      required: [true, 'Time is required']
    },
    photo: {
      type: String
    },
    price: {
      type: String,
      required: [true, 'Price is required']
    },
    availableTicketNumber: {
      type: Number,
      required: [true, ' Available Ticket Number is required']
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required']
    },
    location: {
      type: String,
      required: [true, 'Location is required']
    } 
},
{
  versionKey: false,
  timestamps: true
});

const Event = mongoose.model('event', EventSchema);
module.exports = Event;