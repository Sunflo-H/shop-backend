// 몽구스를 사용하여 몽고디비 컬렉션과 상호작용하는 스키마를 정의
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  size: { type: String },
  color: { type: String },
  quantity: { type: Number, required: true },
});

const favoriteItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

// mongoose의 Schema (= require("mongoose").Schema()를 사용하여 상품의 스키마 정의
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  signUpDate: {
    type: String,
  },
  favoriteList: [favoriteItemSchema],
  cartList: [cartItemSchema],
  // favoriteList: [
  //   { type: Schema.Types.ObjectId, ref: "Product", required: true },
  // ],
  // cartList: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
});

// 모델 이름은 User, 컬렉션이름은 User 임을 명시적으로 설정
const User = mongoose.model("User", userSchema, "User"); // 모델을 생성하여 몽고디비 컬렉션과 상호작용
module.exports = User;

function transformDate(newDate) {
  const isoString = newDate.toISOString();
  const [date, time] = isoString.split("T");
  const dateAndTime = `${date} ${time.substring(0, 8)}`;
  return dateAndTime;
}
