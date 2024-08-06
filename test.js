const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

// MongoDB 연결 문자열 (MongoDB Atlas 사용)
const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/product", async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.log("상품 읽기 실패 : ", error);
    res.status(500).json({ message: error.message });
  }
  res.send(req.body);
});

// 서버 시작
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
