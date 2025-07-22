const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  password: { type: String, default: '' },
});

module.exports = mongoose.model('User', userSchema);
