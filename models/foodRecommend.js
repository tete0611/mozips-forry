const mongoose = require('mongoose');

const food = new mongoose.Schema({
  name: String,
  // hashtag: [foodType],
  menu: [String],
  distance: Number,
  holiday: Number,
  link: String,
  description: String,
});

const Model = (module.exports = mongoose.model('food', food));
