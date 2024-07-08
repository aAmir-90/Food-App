const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

const router = express.Router();

// routes
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
