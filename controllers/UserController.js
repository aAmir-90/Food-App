const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const getUserControllerByID = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User get successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get User Api",
      error,
    });
  }
};

const getUserController = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User get successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get User Api",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(400).send({
        success: false,
        message: "User not update",
      });
    }
    res.status(200).send({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update user Api",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
      deletedUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete user Api",
      error,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "please provide passwords correctly",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Old password",
      });
    }

    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update Password Api",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const user = await User.findOne({ email, answer });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found or Invalid answer",
      });
    }
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Resest Password Api",
      error,
    });
  }
};

module.exports = {
  getUserControllerByID,
  getUserController,
  updateUserController,
  deleteUserController,
  updatePasswordController,
  resetPasswordController,
};
