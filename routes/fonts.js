var express = require('express');
var router = express.Router();
var Font = require('../models/font');

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
