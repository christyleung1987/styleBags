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
  var rgbsString = req.body.rgbsString;
  var rgbsStringSplit = rgbsString.replace(/,r/g, 'splitr');
  var rgbs = rgbsStringSplit.split('split');
  console.log(rgbs);

  var newColorBag = ColorBag({
      name: req.body.name,
      rgbs: rgbs,
      userId: req.body.userId
  });

  newColorBag.save(function(err, user) {
    if (err) console.log(err);
    res.status(200).json({});
    // res.json(newColorBag);
  });
});

/* PUT /colorbags/:id/edit */
router.put('/colorbags/:id/edit', function(req, res, next) {
  ColorBag.findByIdAndUpdate(req.body.id, { name: req.body.name }, function(err, colorbag) {
    if (err) console.log(err);

    res.redirect('/');
  });
});

// Delete from /colorbags/:id
router.delete('/:id', function(req, res, next) {
  console.log(req.params.id);
  ColorBag.findByIdAndRemove(req.params.id, function(err) {
    if (err) console.log(err);

    res.status(200).json({});
  });
});

module.exports = router;
