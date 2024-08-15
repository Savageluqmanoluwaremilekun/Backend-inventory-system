// src/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  variations: [String],
  hidden: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
