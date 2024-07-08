const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(208).send({
        success: false,
        message: "Email already existing",
      });
    }
    // hashing password
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    const response = await newUser.save();
    res.status(200).send({
      success: true,
      message: "User created successfully",
      response,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Register Api",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Fields Empty",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "User login successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Register Api",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
