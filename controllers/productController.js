const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  const { category, status, page, limit } = req.query;
  console.log(category, status, page, limit);
  const query = {};
  if (category) query.category = category;
  if (status) query.status = status;

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
  console.log("아이디로 상품 가져오기");
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
    const updatedProduct = await Product.updateOne(
      { _id: id },
      { $set: updateData }
    ).exec();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProductMany = async (req, res) => {
  const { idList } = req.body;
  try {
    const result = await Product.deleteMany({
      _id: { $in: idList },
    });

    res
      .status(200)
      .json({ message: `${result.deletedCount} products deleted.` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete products.", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deletedProduct = await Product.findByIdAndDelete({
      _id: id,
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product deleted successfully.",
      product: deletedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product.", error: error.message });
  }
};

function transformDate(newDate) {
  const isoString = newDate.toISOString();
  const [date, time] = isoString.split("T");
  const dateAndTime = `${date} ${time.substring(0, 8)}`;
  return dateAndTime;
}
