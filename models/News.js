// models/News.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  newsHeadline: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    required: true
  },
  newsDescription: {
    type: String,
    required: true
  },image: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('News', newsSchema);
