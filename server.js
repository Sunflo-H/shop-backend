const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

// 미들웨어 선언
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
async function connectToMongoDB() {
  try {
    console.log("몽고디비 연결 시도!");
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("몽고디비 연결 성공");
  } catch (err) {
    console.log("몽고디비 연결 실패", err);
  }
}
connectToMongoDB();

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); // 헤더에서 토큰을 꺼내기

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" }); // 토큰이 없을 때
    }
    const decoded = jwt.verify(token, "your_jwt_secret"); // 토큰 검증

    req.userId = decoded.userId; // 토큰에서 유저 ID를 꺼내서 req에 저장
    console.log("userId in token :", req.userId);
    next(); // 다음 미들웨어로 이동
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" }); // 토큰이 유효하지 않음
  }
};

app.get("/", (req, res) => {
  res.send("hi hello");
});

// Routes
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.get("/api/protected-route", auth, (req, res) => {
  res.json(req.userId);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
