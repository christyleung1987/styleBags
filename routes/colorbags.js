var express = require('express');
var router = express.Router();
var ColorBag = require('../models/colorBag');

router.get('/', function(req, res, next) {
  var id = global.currentUser.id;
  ColorBag.find({ userId: id }, 'name rgbs date', function(err, colorbags) {
    if (err) console.log(err);
    res.json(colorbags);
  });
})

router.get('/all', function(req, res, next) {
  ColorBag.find(function(err, colorbags) {
    if (err) console.log(err);
    res.json(colorbags);
  });
})

router.post('/', function(req, res, next) {
  var rgbsString = req.body.rgbs;
  var rgbsStringSplit = rgbsString.replace(/,r/g, 'splitr');
  var rgbs = rgbsStringSplit.split('split');

  var newColorBag = ColorBag({
      name: req.body.colorBagName,
      rgbs: rgbs,
      userId: req.body.userId
  });

  newColorBag.save(function(err, user) {
    if (err) console.log(err);
    //res.redirect('/');
    res.json(newColorBag);
  });
});

// Delete from /colorbags/:id
router.delete('/:id', function(req, res, next) {
  cosole.log(req.params.id);
  Todo.findByIdAndRemove(req.params.id, function(err) {
    if (err) console.log(err);

    res.status(200).json({});
  });
});

module.exports = router;
