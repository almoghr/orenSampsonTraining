const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth/authMiddleware");
const addTransactionController = require("../controllers/transactions/addTransactionController");
const transactionsHistoryController = require("../controllers/transactions/transactionsHistoryController");

router.post(
  "/addtransaction",
  // authMiddleware,
  addTransactionController
);
// router.post(
//   "/addtransaction",
//   authMiddleware,
//   addTransactionController
// );

router.get("/transactionshistory", transactionsHistoryController);
// router.get("/transactionshistory", authMiddleware, transactionsHistoryController);

module.exports = router;
