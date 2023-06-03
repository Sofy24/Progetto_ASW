const express = require('express');
const router = express.Router();
const reportController = require('../controller/ReportController');

router.get('/names', reportController.handleMonthlyReport);


module.exports = router;