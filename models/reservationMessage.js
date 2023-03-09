const mongoose = require('mongoose');

const rsm = new mongoose.Schema({
  message: String,
  reservedAt: String,
  userId: String,
  userNickname: String,
  isRepeat: Boolean,
});

const Model = (module.exports = mongoose.model('reservationMessage', rsm));
