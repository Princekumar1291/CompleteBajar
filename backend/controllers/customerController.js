const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const { userId } = req;
  const products= await Product.find();
  res.status(200).json({success: true, products: products, userId });
};