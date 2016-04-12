var express = require('express');
var router = express.Router();
var ColorBag = require('../models/colorBag');

router.post('/', function(req, res, next) {
  var newColorBag = ColorBag({
      name: req.body.colorBagName,
      rgbs: req.body.rgbs,
  });

  newColorBag.save(function(err, user) {
    if (err) console.log(err);
    alert('ColorBag created!');
    return res.redirect('/');
    //res.json(newColorBag);
  });
});
