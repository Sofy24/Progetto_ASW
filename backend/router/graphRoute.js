const express = require('express');
const router = express.Router();
const radarController = require('../controller/RadarController');
router.get('/radar', radarController.handle2Months);


module.exports = router;