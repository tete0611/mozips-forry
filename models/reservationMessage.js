const mongoose = require('mongoose');

const rsm = new mongoose.Schema({
  message: String,
  reservedAt: String,
  repeatAt: { hour: Number, minute: Number, day: Number },
  userId: String,
  userNickname: String,
  isRepeat: Boolean,
  channelId: String,
});

const Model = (module.exports = mongoose.model('reservationMessage', rsm));
