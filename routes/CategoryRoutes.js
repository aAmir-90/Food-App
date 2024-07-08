const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/CategoryController");
const { route } = require("./authRoutes");

const router = express.Router();

router.post("/create", authMiddleware, createCategoryController);
router.get("/get-all", getAllCategoryController);
router.put("/update/:id", authMiddleware, updateCategoryController);
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
