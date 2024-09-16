const Product = require("../models/product");
const { transformDate } = require("../utils/dateUtils");

exports.getProducts = async (req, res) => {
  console.log("상품리스트에 쓸 상품들 가져와");
  const { category, status, page, limit, searchQuery } = req.query;
  console.log("요청 쿼리 : ", req.query);
  const query = {};
  if (category) query.category = category;
  if (status) query.status = status;
  if (searchQuery) query.name = { $regex: searchQuery };
  console.log(query);
  try {
    const products = await Product.find(query)
      .skip((page - 1) * limit) // 페이지 번호에 따라 건너뛸 문서 수
      .limit(limit);
    res.status(200).json(products);
  } catch (error) {
    console.log("상품 읽기 실패 : ", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  console.log("id로 상품 가져와");
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    console.error("상품 조회 실패:", err);
    res.status(500).json({ error: "상품 조회 실패" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, size, color, description, image, status } =
      req.body;
    const date = transformDate(new Date());
    // 새 상품 객체 생성
    const newProduct = new Product({
      name,
      price,
      category,
      size,
      color,
      description,
      image: image,
      status,
      createdAt: date,
    });
    // 상품 저장
    const savedProduct = await newProduct.save();
    // 성공적으로 저장된 상품을 클라이언트에게 응답
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log("상품 업데이트 실패 : ", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProducts = async (req, res) => {
  const idList = req.body;
  try {
    const result = await Product.deleteMany({
      _id: { $in: idList },
    });

    res.status(200).json(result.deletedCount);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product.", error: error.message });
  }
};

exports.getProductsByIdList = async (req, res) => {
  console.log("아이디들로 상품 가져와 (카트에 쓰임)");
  try {
    const idList = req.body;
    console.log(idList);
    const products = await Product.find({
      _id: { $in: idList },
    });
    console.log(products);
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get products by id", error: err.message });
  }
};
