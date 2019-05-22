const mongoose = require('mongoose');

module.exports = mongoose.model(
  'User',
  new mongoose.Schema({
    displayName: { type: String, required: !process.env.test },
    googleID: { type: String, required: !process.env.test }
  })
);
