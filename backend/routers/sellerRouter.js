const express=require("express")
const sellerRouter = express.Router();
const sellerController=require("../controllers/sellerController")
const multer=require("multer")


sellerRouter.post('/products',sellerController.createProduct);

module.exports=sellerRouter;
