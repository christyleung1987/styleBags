var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: true}
})

var User = new mongoose.model('User', userSchema);

module.exports = User;

