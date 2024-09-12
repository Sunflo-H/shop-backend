const express = require("express");

const {
  login,
  register,
  getUsers,
  deleteUsers,
  updateUser,
  isUser,
  updateCart,
  getUser,
  getUserById,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.post("/login", login);
router.post("/register", register);
router.delete("/delete", deleteUsers);
router.post("/isUser", isUser); // 일치하는 email이 있는지 확인하는 url
router.get("/:id", getUserById);
router.post("/update/:id", updateUser);

module.exports = router;
