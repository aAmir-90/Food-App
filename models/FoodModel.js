const mongoose = require("mongoose");
const { type } = require("os");

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food Title is require"],
    },
    description: {
      type: String,
      required: [true, "Food Description is require"],
    },
    price: {
      type: Number,
      required: [true, "Food Price is require"],
    },
    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurent",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
