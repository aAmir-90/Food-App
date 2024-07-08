const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is require"],
    },
    email: {
      type: String,
      required: [true, "Email is require"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is require"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "Phone number is require"],
    },
    userType: {
      type: String,
      required: [true, "UserType is require"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default: "https://www.freeiconspng.com/uploads/blue-user-icon-32.jpg",
    },
    answer: {
      type: String,
      required: [true, "Answer is require"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
