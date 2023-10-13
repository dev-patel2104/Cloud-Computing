const express = require('express');
const controller = require('../Controllers/controller.js');

const router = express.Router();

router.post('/get-temp', controller.getTemp);

module.exports = router;