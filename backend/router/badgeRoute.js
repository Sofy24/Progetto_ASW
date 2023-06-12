const express = require('express');
const router = express.Router();
const badgeController = require('../controller/BadgeController');
router.get('/', badgeController.handleBadges);


module.exports = router;