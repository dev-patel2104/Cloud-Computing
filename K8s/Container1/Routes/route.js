const express = require('express');
const controller = require('../Controllers/controller.js');

const router = express.Router();

router.post('/store-file', controller.store);
router.post('/get-temperature', controller.getTemp)
module.exports = router;