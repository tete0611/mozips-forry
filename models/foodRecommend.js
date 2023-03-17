const mongoose = require('mongoose');

const food = new mongoose.Schema({
  name: String,
  hashtag: { type: [String] },
  distance: Number,
});

const Model = (module.exports = mongoose.model('food', food));
