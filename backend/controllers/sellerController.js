const Product = require("../models/Product");
const { uploadProductPhotos } = require("../utils/cloudinaryUtils");

const createProduct = [
  uploadProductPhotos.single('productImage'),
  async (req, res, next) => {
    const { name, brand, price, description, category, rating } = req.body
  try {
      if (!req.file) {
        return res.status(400).send({ success: false, message: "Please upload a product image" });
      }
      console.log(req.file);
      const imageUrl = req.file.path;
      const product = new Product({ name, brand, price, description, imageUrl, category, rating });
      await product.save();
      res.status(201).send(product)
    } catch(error) {
      console.log(error);
    }
  }
]

module.exports = {
  createProduct,
}