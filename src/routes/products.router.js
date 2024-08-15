const express = require('express');
const productsRouter = express.Router();
const auth = require('../middlewares/verifyJWT');
const {
    getProducts,
    getProductByID,
    purchaseProduct
  } = require("../controllers/products.controller");


productsRouter.get('/',getProducts);
productsRouter.get('/:id',getProductByID);
productsRouter.post('/:id/purchase',auth,purchaseProduct);

module.exports = productsRouter;