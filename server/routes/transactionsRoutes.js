const express = require("express");

const authMiddleware = require("../middleware/auth/authMiddleware");
const transactionsController = require("../controllers/transactionsController");

const router = express.Router();

router.post(
  "/addtransaction",
  // authMiddleware,
  transactionsController.addTransaction
);
// router.post(
//   "/addtransaction",
//   authMiddleware,
//   transactionsController.addTransaction
// );

module.exports = router;
