const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Blog',
  new mongoose.Schema({
    title: {
      type: String,
      minlength: 3,
      maxlength: 255,
      default: 'Unnamed title'
    },
    content: {
      type: String,
      minlength: 5,
      default: 'Unmentioned content'
    }
  })
);
