const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
connectDB();

// Rest Api
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/UserRoutes"));
app.use("/api/v1/restaurent", require("./routes/RestaurentRoutes"));
app.use("/api/v1/category", require("./routes/CategoryRoutes"));
app.use("/api/v1/food", require("./routes/FoodRoutes"))

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Food App",
  });
});

// Port
const PORT = process.env.PORT || 3000;

// Server created
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
