const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.get('/verify', userController.handleVerification);
router.get('/registrationDate', userController.handleRegistrationDate);
module.exports = router;