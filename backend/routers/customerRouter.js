const express = require("express"); 
const customerRouter = express.Router();
const customerController = require("../controllers/customerController");

customerRouter.get("/products", customerController.getProducts);
customerRouter.post("/cart/:id", customerController.addToCart);
customerRouter.delete("/cart/:id",customerController.deleteFromCart)

module.exports = customerRouter;