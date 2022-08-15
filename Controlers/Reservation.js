const Event = require('../models/event');
const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.idEvent, {$inc: {availableTicketNumber: -1}}, {new: true})
    await Reservation.create(req.body)
    res.send({ message: 'Reservation created' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

