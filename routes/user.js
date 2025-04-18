const express = require("express");

const {
  login,
  register,
  getUsers,
  deleteUsers,
  updateUser,
  isUser,
  getUserById,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.post("/login", login);
router.post("/register", register);
router.delete("/delete", deleteUsers);
router.post("/isUser", isUser); // 일치하는 user 정보(정확히는 email)가 있는지 확인하는 url

router.get("/:id", getUserById);
router.post("/update/:id", updateUser);

module.exports = router;
