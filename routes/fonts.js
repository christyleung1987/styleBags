var express = require('express');
var router = express.Router();
var Font = require('../models/font');

router.get('/', function(req, res, next) {
  var id = global.currentUser.id;
  Font.find({ userId: id }, 'fontName', function(err, fonts) {
    if (err) console.log(err);
    res.json(fonts);
  });
});

router.post('/', function(req, res, next) {
  var newFont = Font({
      fontName: req.body.fontName,
      userId: req.body.userId
  });

  newFont.save(function(err, user) {
    if (err) console.log(err);
    //res.redirect('/');
    res.json(newFont);
  });
});

module.exports = router;
