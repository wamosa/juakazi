const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: String,
  skill: String,
  county: String,
  ward: String,
  contact: String,
  photo: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Worker', workerSchema);
