const {
  loginController,
  registerUserController,
} = require("../controllers/userController");
const express = require("express");

const router = express.Router();

// Initial route
router.get("/", (req, res) => {
  res.send({ message: "connected" });
});
router.post("/login", loginController);
router.post("/register", registerUserController);

module.exports = router;
