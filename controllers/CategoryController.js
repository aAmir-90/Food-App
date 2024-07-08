const Category = require("../models/CategoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(404).send({
        success: false,
        message: "Fields are empty",
      });
    }
    const newCategory = new Category({ title, imageUrl });
    if (!newCategory) {
      return res.status(500).send({
        success: false,
        message: "Error in new Category",
      });
    }
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "Create Category API successfull",
      newCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Create API",
      error,
    });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const categoryAll = await Category.find();
    if (!categoryAll) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categoryAll.length,
      message: "Category Get All API successfull",
      categoryAll,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get All API",
      error,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const updateCategoryId = req.params.id;
    const updateCategory = await Category.findByIdAndUpdate(
      updateCategoryId,
      req.body,
      { new: true }
    );
    if (!updateCategory) {
      return res.status(500).send({
        success: false,
        message: "No category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update by ID API",
      error,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const deleteCategoryId = req.params.id;
    if (!deleteCategoryId) {
      return res.status(404).send({
        success: false,
        message: "Category ID not found",
      });
    }
    const deleteCategory = await Category.findByIdAndDelete(deleteCategoryId);
    if (!deleteCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
      deleteCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete by ID API",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
