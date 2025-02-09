const Product = require("../models/Product");
const { uploadProductPhotos } = require("../utils/cloudinaryUtils");

const createProduct = [
  uploadProductPhotos.single('productImage'),
  async (req, res, next) => {
    const { userId } = req;
    const { name, brand, price, description, category, rating } = req.body
  try {
      if (!req.file) {
        return res.status(400).send({ success: false, message: "Please upload a product image" });
      }
      console.log(req.file);
      const imageUrl = req.file.path;
      const product = new Product({ name, brand, price, description, imageUrl, category, rating, seller: userId });
      await product.save();
      res.status(201).send(product)
    } catch(error) {
      console.log(error);
    }
  }
]


const getProducts=async(req,res)=>{
  console.log(req.userId);
  const {userId}=req;
  try {
    const products=await Product.find({seller:userId});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createProduct,
  getProducts
}