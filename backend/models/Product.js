const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // We keep explicit ID for frontend backward compatibility
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String },
  yearsOld: { type: String },
  condition: { type: String, enum: ['New', 'Like New', 'Good', 'Fair'], required: true },
  image: { type: String, required: true }, // base64 payload
  owner: { type: String, required: true },
  lookingFor: { type: String, required: true }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
