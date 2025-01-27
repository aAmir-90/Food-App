const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected successfully to MongoDB ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Error ", error);
  }
};

module.exports = connectDB;
