const express = require("express");

const categoriesController = require("../controllers/categoriesController");

const router = express.Router();

router.get("/getcategories", categoriesController.getCategories);

module.exports = router;
