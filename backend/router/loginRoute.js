const express = require('express');
const router = express.Router();
const loginController = require('../controller/LoginController');
router.post('/', loginController.handleLogin);


module.exports = router;