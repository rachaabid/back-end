const Event = require('../models/event');
const Reservation = require('../models/reservation');
const pdf = require("pdf-creator-node");
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const nodemailer = require('nodemailer');

exports.createReservation = async (req, res) => {
  try {
    const event = await Event.findById(req.params.idEvent);
    if (event.availableTicketNumber !== 0) {
      const reservation = await Reservation.create(req.body);
      const filePath = path.resolve('./template/reservation.html');
      var templateReservation = fs.readFileSync(filePath, { encoding: 'utf-8' });
      options = { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }
      const render = ejs.render(templateReservation, options);

      var document = {
        html: render,
        data: {
          users: reservation,
        },
        path: path.resolve(`./tickets/${reservation._id}.pdf`)
      };
      var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm"
      }

      pdf
        .create(document, options)
        .then((res) => {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.email,
              pass: process.env.password,
            },
          });

          let info = ({
            from: '"RACHA" <req.body.email>',
            to: "rachabnabid@gmail.com",
            subject: "Reservation",
            html: render,
            attachments: [
              {
                filename: 'reservation.pdf',
                content: fs.createReadStream(res.filename)
              }],
          });
          transporter.sendMail(info)
        })
      await Event.findByIdAndUpdate(req.params.idEvent, { $inc: { availableTicketNumber: -1 } }, { new: true })
      res.json({ message: 'Reservation created' })
    }
    else {
      res.status(400).json({message: 'No tickets available'})
    }

  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

