const express = require('express');
const router = express.Router();
const depositController = require('../controller/DepositController');

router.post('/', depositController.handleDeposit);

module.exports = router;