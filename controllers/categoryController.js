const Category = require("../models/category");

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log("상품 읽기 실패 : ", error);
    res.status(500).json({ message: error.message });
  }
};
