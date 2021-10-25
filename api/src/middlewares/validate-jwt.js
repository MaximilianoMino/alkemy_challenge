const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ msg: "No token in request" });
  }

  console.log(token);

  next();
};

module.exports = validateJWT;
