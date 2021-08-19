const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categoriesController");

router.get("/getcategories", categoriesController.getCategories);

module.exports = router;
