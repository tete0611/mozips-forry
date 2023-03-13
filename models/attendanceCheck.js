const mongoose = require('mongoose');

const cnfcpr = new mongoose.Schema({
  count: { type: String },
  userId: String,
  date: String,
});

const Model = (module.exports = mongoose.model('attendanceCheck', cnfcpr));
