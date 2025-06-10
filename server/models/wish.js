const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Wish = mongoose.model('Wish', wishSchema);

module.exports = Wish;
