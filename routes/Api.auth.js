const express = require('express');
const router = express.Router();

const {signup, login, forgotPassword, resetPassword, logOut} = require('../Controlers/auth');

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:resetToken', resetPassword);

router.get('/logout', logOut)

module.exports = router;