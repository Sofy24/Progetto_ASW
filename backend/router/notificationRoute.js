const express = require('express');
const router = express.Router();
const notificationController = require('../controller/NotificationController');

router.get('/', notificationController.handleNewNote);

module.exports = router;