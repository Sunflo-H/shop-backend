const express = require("express");
const connectDB = require("./mongodb");
const userRouter = require("./routes/user");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

require("dotenv").config();

connectDB();

app.use(express.json());
app.use(cors());

const auth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", ""); // 헤더에서 토큰을 꺼내기
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" }); // 토큰이 없을 때
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret"); // 토큰 검증
    req.username = decoded.username; // 토큰에서 유저 ID를 꺼내기

    next(); // 다음 미들웨어로 이동
    console.log(3);
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" }); // 토큰이 유효하지 않음
  }
};

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRouter);
app.get("/api/protected-route", auth, (req, res) => {
  console.log(req.username, 1);
  res.json({
    message: `This is a protected route for username: ${req.username}`,
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
