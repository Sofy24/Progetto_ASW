const express = require('express');
const router = express.Router();
const typologyController = require('../controller/TypologyController');

router.get('/price', typologyController.handleTypologyPrice);
module.exports = router;