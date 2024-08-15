const mongoose = require("mongoose");

async function connectDB() {
  const mongoURI = process.env.MONGODB_URI;
  await mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB에 연결되었습니다."))
    .catch((error) => console.error("MongoDB 연결 실패:", error.message));
}

module.exports = connectDB;
