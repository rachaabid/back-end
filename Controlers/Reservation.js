const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
  try {
    await Reservation.create(req.body)
    res.send({ message: 'Reservation created' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.send(reservations);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation)
    res.send(reservation);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.update = async (req, res) => {
  try {
    await Reservation.findByIdAndUpdate(req.params.idReservation, req.body)
    res.send({ message: 'Reservation updated' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndRemove(req.params.idReservation)
    res.send({ message: 'Reservation deleted' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}