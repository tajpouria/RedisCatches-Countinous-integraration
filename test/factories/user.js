const config = require('config');
const mongoose = require('mongoose');
const User = require('../../models/User');

mongoose.connect(config.get('database.mongodb.uri'));

module.exports = () => new User({}).save();
