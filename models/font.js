var mongoose = require('mongoose');

var fontSchema = new mongoose.Schema({
  fontName: {type: String, required: true, unique: true},
  category: {type: String},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: Array
})

var Font = mongoose.model('Font', fontSchema);

module.exports = Font;
