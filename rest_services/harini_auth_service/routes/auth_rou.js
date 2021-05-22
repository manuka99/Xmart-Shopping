const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  ValidateToken,
} = require("../controller/auth");

// register user
router.post("/register", register);

// authenticate
router.post("/login", login);

// recover password
router.post("/forgotPassword", forgotPassword);

// accepting reset token when resetting the password
router.put("/passwordreset/:resetToken", resetPassword);

// validate token
router.post("/validateToken", ValidateToken);

module.exports = router;
