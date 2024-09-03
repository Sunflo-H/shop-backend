const express = require("express");

const {
  login,
  register,
  getUsers,
  deleteUsers,
  updateUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.post("/login", login);
router.post("/register", register);
router.delete("/delete", deleteUsers);
router.post("/update/:id", updateUser);

module.exports = router;
