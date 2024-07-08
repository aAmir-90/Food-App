const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getAllFoodByIdController,
  getFoodByRestaurentController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/FoodController");
const { adminMiddleware } = require("../middleware/adminMiddleware");
const router = express.Router();

// Food Routes
router.post("/create", authMiddleware, createFoodController);
router.get("/get-all", getAllFoodController);
router.get("/get/:id", getAllFoodByIdController);
router.get("/getByRestaurent/:id", getFoodByRestaurentController);
router.put("/update/:id", authMiddleware, updateFoodController);
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// Order Routes
router.post("/place-order", authMiddleware, placeOrderController);
router.post("/order-status/:id", authMiddleware, adminMiddleware, orderStatusController)

module.exports = router;
