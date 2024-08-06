const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 80;

// 미들웨어 선언
// app.use(cors());
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
    console.log("몽고디비 연결 실패");
    console.log("그 에러 원인 : ", err);
  }
}
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("hi hello");
});

// Routes
app.use("/api/product", productRouter);

// app.use("/api/category", categoryRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
