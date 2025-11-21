const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  pin: { type: String, required: true }, // Encrypted
  sessionOnly: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pin', pinSchema);