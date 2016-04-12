var mongoose = require('mongoose');

var colorBagSchema = new mongoose.Schema({
  name: {type: String, required: true},
  rgbs: Array,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: Array
})

var ColorBag = new mongoose.model('Color', colorBagSchema);

module.exports = ColorBag;
