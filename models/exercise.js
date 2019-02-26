const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exercise', exerciseSchema);
