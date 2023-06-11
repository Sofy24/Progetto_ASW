const express = require('express');
const router = express.Router();
const binStateController = require('../controller/BinsStateController');

router.post('/', binStateController.handleBinsState);

module.exports = router;