const express = require("express");
const {
  getUserControllerByID,
  getUserController,
  updateUserController,
  deleteUserController,
  updatePasswordController,
  resetPasswordController,
} = require("../controllers/UserController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// Get User
router.get("/get-user", authMiddleware, getUserController);
router.get("/get-user/:id", authMiddleware, getUserControllerByID);
router.put("/update/:id", authMiddleware, updateUserController);
router.delete("/delete/:id", authMiddleware, deleteUserController);
router.post("/update-password/:id", authMiddleware, updatePasswordController);
router.post("/reset-password", authMiddleware, resetPasswordController)

module.exports = router;
