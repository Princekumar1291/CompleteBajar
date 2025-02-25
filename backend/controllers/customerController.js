const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");

exports.getProducts = async (req, res) => {
  const products= await Product.find();
  res.status(200).json({success: true, products: products,});
}; 

exports.addToCart = async (req, res) => {
  const productId= req.params.id;
  const userId= req.userId;
  const user=await User.findById(userId);
  user.cart.push(productId);
  await user.save();
  const carts=user.cart;
  res.status(200).json({success:true,cart:user.cart});
};

exports.deleteFromCart=async (req,res)=>{
  const productId= req.params.id;
  const userId= req.userId;
  const user=await User.findById(userId);
  user.cart.pull(productId);
  await user.save();
  const carts=user.cart;
  res.status(200).json({success:true,cart:user.cart});
}