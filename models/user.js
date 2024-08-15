// 몽구스를 사용하여 몽고디비 컬렉션과 상호작용하는 스키마를 정의
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// mongoose의 Schema (= require("mongoose").Schema()를 사용하여 상품의 스키마 정의
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
});

// 모델 이름은 User, 컬렉션이름은 User 임을 명시적으로 설정
// module.exports = mongoose.model("User", userSchema, "User"); // 모델을 생성하여 몽고디비 컬렉션과 상호작용
module.exports = mongoose.model("User", userSchema, "User"); // 모델을 생성하여 몽고디비 컬렉션과 상호작용
// role: {
//   type: String,
//   enum: ["user", "manager"],
//   default: "user",
// },
// favoriteList: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "Product", // Product 컬렉션을 참조
//   },
// ],
// cartList: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "Product", // Product 컬렉션을 참조
//   },
// ],
