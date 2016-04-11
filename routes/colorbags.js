// var express = require('express');
// var router = express.Router();
// var ColorBag = require('../models/colorBag');


// /* POST /colorbags */
// router.post('/colorbags', function(req, res, next) {
//   var name = req.body.colorsName;
//   var rgbs = req.body.colorsRgbs;
//   var userId = req.body.userId

//   var newColorBag = ColorBag({
//     name: name,
//     rgbs: rgbs,
//     userId: userId,
//     createdAt: new Date()
//   });

//   // Save the color bag
//   newColorBag.save(function(err, colorBag) {
//       if (err) console.log(err);

//       res.json(colorBag);
//   });
// });
