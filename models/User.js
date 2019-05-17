const mongoose = require('mongoose');

module.exports = mongoose.model(
  'User',
  new mongoose.Schema({
    displayName: { type: String, required: true },
    googleID: { type: String, required: true }
  })
);
