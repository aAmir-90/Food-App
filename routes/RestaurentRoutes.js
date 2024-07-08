const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createRestaurentController, getAllRestaurentController, getAllRestaurentByIdController, deleteRestaurentController } = require("../controllers/RestaurentController");
const router = express.Router();

router.post("/create", authMiddleware, createRestaurentController)
router.get("/get-all", getAllRestaurentController)
router.get("/get/:id", getAllRestaurentByIdController)
router.delete("/delete/:id", authMiddleware, deleteRestaurentController)


module.exports = router;