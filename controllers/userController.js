const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { id, password, username } = req.body;
    console.log(id, password, username);
    // 이미 존재하는 사용자인지 확인
    let user = await User.findOne({ id });
    if (user) {
      return res.status(400).json({ msg: "이미 존재하는 사용자입니다." });
    }

    // 새 사용자 생성
    user = new User({
      id,
      password,
      username,
    });

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log(1);
    await user.save();
    console.log(2);

    // JWT 토큰 생성
    const payload = {
      user: {
        jwt: user.jwt,
      },
    };
    console.log(3);

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
    const { id, password, username } = req.body;

    // 사용자 확인
    let user = await User.findOne({ id });
    if (!user) {
      return res.status(400).json({ msg: "유효하지 않은 자격 증명" });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "유효하지 않은 자격 증명" });
    }

    // JWT 토큰 생성
    const payload = {
      user: {
        jwt: user.jwt,
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
