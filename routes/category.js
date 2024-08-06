const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// 모든 카테고리 가져오기
router.get("/", categoryController.getAllCategory);

module.exports = router;
