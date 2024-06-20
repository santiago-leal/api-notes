const {
  getUserController,
  updateUserController,
} = require("../controllers/userController");
const express = require("express");

const router = express.Router();

router.get("/user", getUserController);
router.put("/user", updateUserController);

module.exports = router;
