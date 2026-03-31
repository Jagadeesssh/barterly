const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  sender: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: String, required: true }
}, { _id: false });

const conversationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  productId: { type: String, required: true },
  owner: { type: String, required: true },
  messages: [messageSchema],
  lastUpdated: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Conversation', conversationSchema);
