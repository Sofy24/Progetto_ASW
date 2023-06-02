const express = require('express');
const router = express.Router();
const municipalityController = require('../controller/MunicipalityController');

router.get('/names', municipalityController.handleMunicipalitiesNames);
//router.get('/', municipalityController.handleMunicipalities);

module.exports = router;