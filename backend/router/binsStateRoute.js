const express = require('express');
const router = express.Router();
const binStateController = require('../controller/BinsStateController');

router.get('/', binStateController.handleBinsState);

module.exports = router;