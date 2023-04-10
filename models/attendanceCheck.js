const mongoose = require('mongoose');

const cnfcpr = new mongoose.Schema({
  count: { type: Number },
  userId: String,
  date: String,
  successionCount: Number,
  monthlyCount: Number,
});

const Model = (module.exports = mongoose.model('attendanceCheck', cnfcpr));
