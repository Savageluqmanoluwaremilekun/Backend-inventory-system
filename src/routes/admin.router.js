const express = require("express");
const adminRouter = express.Router();
const {
    newProduct,
    editProduct,
    hideProduct,
    getProductStockLevel,
    getStockLevelNotifications,
    productVarriations
  } = require("../controllers/admin.controller");
// middleware implementation
const auth = require('../middlewares/roleVerification');
const verifyJWT = require("../middlewares/verifyJWT")


adminRouter.post('/products',verifyJWT, auth, newProduct);
adminRouter.put('/products/:id', verifyJWT, auth, editProduct);
adminRouter.patch('/products/:id/hide', verifyJWT, auth, hideProduct);
adminRouter.get('/products/:id/stock', verifyJWT, auth, getProductStockLevel);
adminRouter.get('/stock-notifications', verifyJWT, auth, getStockLevelNotifications);
adminRouter.get('/product-varriations/:id', verifyJWT, auth, productVarriations)

module.exports = adminRouter;