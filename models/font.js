var mongoose = require('mongoose');

var fontSchema = new mongoose.Schema({
  fontName: {type: String, required: true, unique: true},
  category: {type: String, required: true},
  userId: {type: Number, required: true},
  tags: Array
})

var Font = new mongoose.model('Font', fontSchema);

module.exports = Font;
