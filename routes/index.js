var express = require('express');
var passport = require('passport')
var router = express.Router();

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we can continue with next
  // https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js#L74
  if (req.isAuthenticated()) return next();
  // Otherwise
  req.flash('errorMessage', 'Login to access!');
  return res.redirect('/login');
}

function unAuthenticatedUser(req, res, next) {
  if (!req.isAuthenticated()) return next();
  // Otherwise
  req.flash('errorMessage', 'You are already logged in!');
  return res.redirect('/');
}

/* GET home page. */
router.get('/', authenticatedUser, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /signup */
router.get('/signup', unAuthenticatedUser, function(req, res, next) {
  res.render('signup', { message: req.flash('errorMessage') });
});

/* POST /signup */
router.post('/signup', function(req, res, next) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  });
  return signupStrategy(req, res);
});

/* GET /login */
router.get('/login', unAuthenticatedUser, function(req, res, next) {
  res.render('login', { message: req.flash('errorMessage') });
});

/* POST /login */
router.post('/login', function(req, res, next) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  });

  return loginStrategy(req, res);
});

/* GET /logout */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = router;


