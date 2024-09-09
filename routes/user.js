const express = require("express");

const {
  login,
  register,
  getUsers,
  deleteUsers,
  updateUser,
  isUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.post("/login", login);
router.post("/register", register);
router.delete("/delete", deleteUsers);
router.post("/update/:id", updateUser);

// 일치하는 email이 있는지 확인하는 url
router.post("/isUser", isUser);

module.exports = router;
