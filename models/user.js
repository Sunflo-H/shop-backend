// 몽구스를 사용하여 몽고디비 컬렉션과 상호작용하는 스키마를 정의
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// mongoose의 Schema (= require("mongoose").Schema()를 사용하여 상품의 스키마 정의
const userSchema = new Schema({
  username: {
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
  role: {
    type: String,
    enum: ["user", "manager"],
    default: "user",
  },
  favoriteList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product", // Product 컬렉션을 참조
    },
  ],
  cartList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product", // Product 컬렉션을 참조
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 모델 이름은 User, 컬렉션이름은 User 임을 명시적으로 설정
const User = mongoose.model("User", userSchema, "User"); // 모델을 생성하여 몽고디비 컬렉션과 상호작용

module.exports = User;
