const express = require('express');
const router = express.Router();
const badgeController = require('../controller/BadgeController');
//console.log("banana")
router.get('/', badgeController.handleBadges);


module.exports = router;