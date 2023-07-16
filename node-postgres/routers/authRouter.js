const express = require("express");
const router = express.Router();
const { validateForm } = require("../controllers/validateForm");
const pool = require("../db");
const bcrypt = require("bcrypt");
const {
  handleLogin,
  attemptLogin,
  attemptRegister,
} = require("../controllers/authController");

router.route("/login").get(handleLogin).post(validateForm, attemptLogin);

router.route("/signup").post(validateForm, attemptRegister);

router.post;

module.exports = router;
