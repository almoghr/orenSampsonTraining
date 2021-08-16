const express = require("express");

const productsController = require("../controllers/productsController");

const router = express.Router();

router.get("/getproducts", productsController.getProdcuts);

module.exports = router;
