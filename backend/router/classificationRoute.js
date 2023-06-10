const express = require('express');
const router = express.Router();
const classificationController = require('../controller/ClassificationController');

router.get('/', classificationController.handleClassification);

module.exports = router;