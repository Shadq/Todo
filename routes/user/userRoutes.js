const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  logout,
} = require("../../controllers/userController");
const { authorized } = require("../../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/getMe", authorized, getMe);
router.post("/logout", logout);

module.exports = router;
