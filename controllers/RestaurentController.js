const Restaurent = require("../models/RestaurentModel");

const createRestaurentController = async (req, res) => {
  try {
    const restaurentData = req.body;
    if (!restaurentData) {
      return res.status(404).send({
        success: false,
        message: "Restaurent Data not found",
      });
    }
    const newRestaurent = new Restaurent(restaurentData);
    await newRestaurent.save();
    res.status(200).send({
      success: true,
      message: "Restaurent created successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Create Restaurent API",
      error,
    });
  }
};

const getAllRestaurentController = async (req, res) => {
  try {
    const restaurents = await Restaurent.find();
    if (!restaurents) {
      return res.status(404).send({
        success: false,
        message: "Restaurent not found",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurents.length,
      restaurents,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get Restaurent API",
      error,
    });
  }
};

const getAllRestaurentByIdController = async (req, res) => {
  try {
    const restaurentId = req.params.id;
    if (!restaurentId) {
      return res.status(404).send({
        success: false,
        message: "Restaurent Id not found",
      });
    }
    const restaurant = await Restaurent.findById(restaurentId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurent not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurent get successfully by ID",
      restaurant,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get Restaurent By ID API",
      error,
    });
  }
};

const deleteRestaurentController = async (req, res) => {
  try {
    const restaurentId = req.params.id;
    if (!restaurentId) {
      return res.status(404).send({
        success: false,
        message: "Restaurent Id not found",
      });
    }
    const deletedRestaurent = await Restaurent.findByIdAndDelete(restaurentId);
    if (!deletedRestaurent) {
      return res.status(404).send({
        success: false,
        message: "Restaurent not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurent Deleted successfully by ID",
      deletedRestaurent,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete Restaurent API",
      error,
    });
  }
};

module.exports = {
  createRestaurentController,
  getAllRestaurentController,
  getAllRestaurentByIdController,
  deleteRestaurentController,
};
