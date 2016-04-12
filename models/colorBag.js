var mongoose = require('mongoose');

var colorBagSchema = new mongoose.Schema({
  name: {type: String, required: true},
  rgbs: Array,
  date: {type: Date, default: Date.now},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: Array
})

var ColorBag = mongoose.model('ColorBag', colorBagSchema);

module.exports = ColorBag;
