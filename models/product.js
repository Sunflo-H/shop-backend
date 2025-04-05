// 몽구스를 사용하여 몽고디비 컬렉션과 상호작용하는 스키마를 정의
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// mongoose의 Schema (= require("mongoose").Schema()를 사용하여 상품의 스키마 정의
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  color: [{ type: String, trim: true }],
  size: [{ type: String, trim: true }],
  quantity: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    required: true,
  },
});

// 모델 이름은 Product, 컬렉션이름은 Products 임을 명시적으로 설정
const Product = mongoose.model("Product", productSchema, "Products"); // 모델을 생성하여 몽고디비 컬렉션과 상호작용

module.exports = Product;
