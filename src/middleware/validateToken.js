const jwt = require("jsonwebtoken");
const express = require("express");

const validateToken = express.Router();
validateToken.use((req, res, next) => {
  const token = req.headers["token"];

  if (token) {
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({
      message: "Token is required",
    });
  }
});

module.exports = validateToken;
