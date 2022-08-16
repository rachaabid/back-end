const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createReservation } = require('../Controlers/Reservation');

router.post('/Reservation/:idEvent',  
 passport.authenticate('bearer', {session: false}),
createReservation);



module.exports = router;