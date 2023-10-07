const express = require('express');
const controller = require('../Controllers/controller.js');

const router = express.Router();

router.post('/store-data', controller.storeData);
router.post('/append-data', controller.appendData);
router.post('/search-data', controller.searchData);
router.post('/delete-file', controller.deleteFile);

module.exports = router;