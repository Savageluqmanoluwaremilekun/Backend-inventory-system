const Product = require('../models/product.models');
const Order = require('../models/order.models'); // Assuming you have an Order model


// Get all products (visible to clients)
async function getProducts (req, res) {
  try {
    const products = await Product.find({ hidden: false });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get product by ID (visible to clients)
async function getProductByID (req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.hidden) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Mock purchase process
async function purchaseProduct (req, res) {
  const { quantity } = req.body;
  if (!quantity) {
    return res.status(404).json({message: "Input the quantity of the product you wish to buy"})
  }
  try {
    let product = await Product.findById(req.params.id);
    if (!product || product.hidden) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ msg: 'Not enough stock' });
    }

    product.stock -= quantity;
    await product.save();

    const order = new Order({
      user: req.user.id,
      product: product.id,
      name: product.name,
      quantity,
      total: product.price * quantity
    });

    await order.save();

    res.json({ msg: 'Purchase successful', order });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};




module.exports = {
  getProducts,
  getProductByID,
  purchaseProduct
};
