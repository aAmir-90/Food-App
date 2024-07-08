const { error } = require("console");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(500).send({
      error: "Unauthorized",
    });
  }

  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(400).send({
      error: "Token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(500).send({
      error: "Error ",
      error,
    });
  }
};

module.exports = { authMiddleware };
