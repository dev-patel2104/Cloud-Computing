const express = require('express');
const router = express.Router();
const ProductController = require("../controller/controller");

router.post("/store-products", ProductController.storeProducts);
router.get("/list-products", ProductController.listProducts);

module.exports = router;