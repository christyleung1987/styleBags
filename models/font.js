var mongoose = require('mongoose');

var fontSchema = new mongoose.Schema({
  fontName: {type: String, required: true, unique: true},
  category: {type: String},
  date: {type: Date, default: Date.now},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: Array
})

var Font = mongoose.model('Font', fontSchema);

module.exports = Font;
