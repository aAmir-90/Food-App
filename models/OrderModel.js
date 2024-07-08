const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    food: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepare", "on the way", "delivered"],
      default: "preparing",
    },
  },

  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
