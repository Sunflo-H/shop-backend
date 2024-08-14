const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

require("dotenv").config();

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello World");
});

// MongoDB 연결 문자열 (MongoDB Atlas 사용)
const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.post("/api/user/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: "Something error" });
  }
});

app.post("/api/user/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "로그인 정보가 일치하지 않습니다." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "youer_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Something error" });
  }
});

// const auth = (req, res, next) => {
//   const token = req.header("Authorization").replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, "your_jwt_secret");
//     req.user = decoded.userId;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

// app.get("/protected", auth, (req, res) => {
//   res.json({ message: `Welcome, user with ID: ${req.user}` });
// });

// 서버 시작
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
