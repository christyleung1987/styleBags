var mongoose = require('mongoose');

var colorBagSchema = new mongoose.Schema({
  name: {type: String, required: true},
  hexCodes: Array,
  userId: {type: objectId, required: true},
  tags: Array
})

var ColorBag = new mongoose.model('Color', colorBagSchema);

module.exports = ColorBag;
