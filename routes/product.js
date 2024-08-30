const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductMany,
} = require("../controllers/productController");

// express.Router()에 이 데이터를 저장하는 행위구만, 최종적으로 Router를 export해서 server.js에서 사용하는거지
// 모든 상품 가져오기
router.get("/", getProducts);

// 특정 상품 가져오기
router.get("/:id", getProductById);

// 새로운 상품 생성
router.post("/create", createProduct);

// 특정 상품 업데이트
router.post("/update/:id", updateProduct);

// 상품 삭제
router.delete("/delete", deleteProductMany);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
