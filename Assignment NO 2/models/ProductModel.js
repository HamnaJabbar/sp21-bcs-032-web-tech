

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
 description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },

  size: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
