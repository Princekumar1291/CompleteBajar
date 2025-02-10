const Product = require("../models/Product");
const { uploadProductPhotos, deleteProductByUrl } = require("../utils/cloudinaryUtils");

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

const deleteProduct = async (req, res) => {
  try {
    const id=req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      res.status(404).json({ message: "Product not found" });
    }else{
      res.status(200).json({ message: "Product deleted successfully" });
      await deleteProductByUrl(product.imageUrl);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createProduct,
  getProducts,
  deleteProduct
}