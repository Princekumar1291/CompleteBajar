const express = require("express"); 
const customerRouter = express.Router();
const customerController = require("../controllers/customerController");

customerRouter.get("/products", customerController.getProducts);

module.exports = customerRouter; 