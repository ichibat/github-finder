const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('User', UserSchema);