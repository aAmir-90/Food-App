const Food = require("../models/FoodModel");
const Order = require("../models/OrderModel");

// FOOD CONTROLLERS

const createFoodController = async (req, res) => {
  try {
    const foodData = req.body;
    if (!foodData) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    const newFood = new Food(foodData);
    if (!newFood) {
      return res.status(404).send({
        success: false,
        message: "New Food not found",
      });
    }
    await newFood.save();
    res.status(200).send({
      success: true,
      message: "New Food Created Successfully",
      newFood,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Food Create API",
      error,
    });
  }
};

const getAllFoodController = async (req, res) => {
  try {
    const getFoods = await Food.find();
    if (!getFoods) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    res.status(200).send({
      success: true,
      totalCounts: getFoods.length,
      message: "Food get successfully",
      getFoods,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Food Get API",
      error,
    });
  }
};

const getAllFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food ID not found",
      });
    }
    const getFoodById = await Food.findById(foodId);
    if (!getFoodById) {
      return res.status(500).send({
        success: false,
        message: "Food getting has an issue",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food get by ID successfully",
      getFoodById,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Food Get by ID API",
      error,
    });
  }
};

const getFoodByRestaurentController = async (req, res) => {
  try {
    const restaurentId = req.params.id;
    if (!restaurentId) {
      return res.status(404).send({
        success: false,
        message: "Food ID not found",
      });
    }
    const getFoodById = await Food.find({ restaurent: restaurentId });
    if (!getFoodById) {
      return res.status(500).send({
        success: false,
        message: "Food getting has an issue",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food get bASE ON RESTAURENT successfully",
      getFoodById,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Food Get by ID API",
      error,
    });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food ID not found",
      });
    }
    const updateFoodById = await Food.findByIdAndUpdate(foodId, req.body, {
      new: true,
    });
    if (!updateFoodById) {
      return res.status(500).send({
        success: false,
        message: "Food getting has an issue",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food get bASE ON RESTAURENT successfully",
      updateFoodById,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Food Update API",
      error,
    });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    const deleteFood = await Food.findByIdAndDelete(foodId);
    if (!deleteFood) {
      return res.status(500).send({
        success: false,
        message: "Food delete has issue",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food Deleted successfully",
      deleteFood,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Food Delete API",
      error,
    });
  }
};

// ORDER CONTROLLERS

const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please add food cart or payment method",
      });
    }
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    const newOrder = new Order({
      food: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(200).send({
      success: true,
      message: "Order place successfully",
      newOrder,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Order Place API",
      error,
    });
  }
};

// Food Status Change

const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide valid order id",
      });
    }
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { new: true });
    res.status(200).send({
      success: true,
      message: "Order Status Successfull",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Order Status API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getAllFoodByIdController,
  getFoodByRestaurentController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
