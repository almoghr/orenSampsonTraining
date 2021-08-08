const express = require("express");

const signup = require("../controllers/auth/signup");
const login = require("../controllers/auth/login");
const {
  signupValidator,
  loginValidator,
} = require("../middleware/validators/auth");

const router = express.Router();

router.put("/signup", signupValidator, signup);

router.post("/login", loginValidator, login);

module.exports = router;
