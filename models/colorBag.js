var mongoose = require('mongoose');

var colorBagSchema = new mongoose.Schema({
  name: {type: String, required: true},
  rgbs: Array,
  user: [{ type: colorBagSchema.Types.ObjectId, ref: 'User' }],
  tags: Array
})

var ColorBag = new mongoose.model('Color', colorBagSchema);

module.exports = ColorBag;

