const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  // console.log(req.body);
  try {
    const { name, price, category, size, color, description, image, status } =
      req.body;

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
      createdAt: new Date(),
    });

    // 상품 저장
    const savedProduct = await newProduct.save();
    // 성공적으로 저장된 상품을 클라이언트에게 응답
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log("상품 생성 실패 : ", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.log("상품 읽기 실패 : ", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }
    res.status(200).json(product); // 성공적으로 조회된 특정 상품을 클라이언트에게 응답
  } catch (err) {
    console.error("상품 조회 실패:", err);
    res.status(500).json({ error: "상품 조회 실패" });
  }
};
