const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { transformDate } = require("../utils/dateUtils");

exports.register = async (req, res) => {
  console.log("회원가입");
  try {
    console.log(req.body);
    const { email, name, password, phone, role } = req.body;
    console.log(req.body);
    const date = transformDate(new Date());

    // 이미 존재하는 사용자인지 확인
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // 새 사용자 생성
    user = new User({
      email,
      name,
      password,
      phone,
      role,
      signUpDate: date,
    });
    console.log(user);
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
  console.log("로그인");
  try {
    const { email, password } = req.body;

    // 사용자 확인
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Email does not exist" });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password is incorrect" });
    }

    // JWT 토큰 생성
    jwt.sign(
      { userId: user._id },
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
    res.status(500).send("로그인 서버 오류");
  }
};

exports.getUsers = async (req, res) => {
  console.log("유저 가져와");

  try {
    const { role, page, limit, searchQuery } = req.query;
    const query = {};
    if (role) query.role = role;
    if (searchQuery) query.name = { $regex: searchQuery };
    const users = await User.find(query)
      .skip((page - 1) * limit) // 페이지 번호에 따라 건너뛸 문서 수
      .limit(limit);

    res.status(200).json(users);
  } catch (error) {
    console.log("상품 읽기 실패 : ", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUsers = async (req, res) => {
  console.log("유저 삭제");
  try {
    const idList = req.body;
    const result = await User.deleteMany({
      _id: { $in: idList },
    });

    res.status(200).json(result.deletedCount);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete users.", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  console.log("업데이트");
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log(req.params);
    console.log(req.body);
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user.", error: error.message });
  }
};

exports.isUser = async (req, res) => {
  console.log("중복체크");
  const { email } = req.body;
  console.log(email);

  const user = await User.find({ email });
  res.status(200).json(user);
};

exports.getUserById = async (req, res) => {
  console.log("아이디로 유저 정보 한개 가져와");
  try {
    console.log(req.params);
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Fail to get user", error: err.message });
  }
};
