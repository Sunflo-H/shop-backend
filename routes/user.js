const express = require("express");

const { login, register, getUsers } = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
