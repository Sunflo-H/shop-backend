const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
// require("dotenv").config();

// express.Router()에 이 데이터를 저장하는 행위구만, 최종적으로 Router를 export해서 server.js에서 사용하는거지
// 모든 상품 가져오기
router.get("/", productController.getProducts);

// 특정 상품 가져오기
router.get("/:id", productController.getProductById);

// 새로운 상품 생성
router.post("/create", productController.createProduct);

module.exports = router;
