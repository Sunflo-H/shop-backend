// 몽구스를 사용하여 몽고디비 컬렉션과 상호작용하는 스키마를 정의
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// mongoose의 Schema (= require("mongoose").Schema()를 사용하여 상품의 스키마 정의
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// 모델 이름은 Product, 컬렉션이름은 Products 임을 명시적으로 설정
const Category = mongoose.model("Category", categorySchema, "Category"); // 모델을 생성하여 몽고디비 컬렉션과 상호작용

module.exports = Category;
