const express = require('express');
const router = express.Router();
const controller = require("../controller/controller");

router.post("/store-products", controller.storeProducts);
router.get("/list-products", controller.listProducts);

module.exports = router;