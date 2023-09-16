const express = require('express');
const validatorController = require('../Controllers/controller.js');

const router = express.Router();

router.post('/user-info', validatorController.validate);

module.exports = router;