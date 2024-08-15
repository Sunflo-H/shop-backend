const express = require("express");
const connectDB = require("./mongodb");
const userRouter = require("./routes/user");

const app = express();

require("dotenv").config();

connectDB();

app.use(express.json());

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
