const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth/authMiddleware");
const productsController = require("../controllers/productsController");

router.get("/getproducts", authMiddleware, productsController.getProdcuts);

module.exports = router;
