const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  product: { type: Object, required: true }, // Simple object dump of the target product to mirror frontend
  status: { type: String, enum: ['Pending', 'Accepted', 'Declined'], default: 'Pending' },
  dateOffered: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Swap', swapSchema);
