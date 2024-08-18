const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  console.log("회원가입");
  try {
    const { username, password } = req.body;
    console.log(username, password);
    // 이미 존재하는 사용자인지 확인
    let user = await User.findOne({ username });
    console.log(user);
    if (user) {
      return res.status(400).json({ msg: "Username already exists" });
    }
    // 새 사용자 생성
    user = new User({
      username,
      password,
    });

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // JWT 토큰 생성
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "yourSecretKey", // 실제 프로젝트에서는 환경 변수로 관리해야 합니다
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("서버 오류");
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자 확인
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "Username does not exist" });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password is incorrect" });
    }
    console.log(user);
    console.log(user.username);
    // JWT 토큰 생성
    jwt.sign(
      { username: user.username },
      "your_jwt_secret", // 실제 프로젝트에서는 환경 변수로 관리해야 합니다
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("서버 오류");
  }
};
