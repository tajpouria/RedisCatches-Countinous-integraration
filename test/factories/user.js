const mongoose = require('mongoose');
const User = require('../../models/User');

mongoose.connect('mongodb://localhost/blogster', { useNewUrlParser: true });

module.exports = () => new User({}).save();
