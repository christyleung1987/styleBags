var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var fontKey = require('./key');

var flash = require('connect-flash');
var ejsLayouts = require("express-ejs-layouts");
var session = require('express-session');
var methodOverride = require('method-override');
var passport = require('passport');

var mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONN_STYLE_BAGS);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'STYLEBAGS-EXPRESS-AUTH'
}));

// PASSPORT AUTHENTICATION
// every view automatically uses flash
app.use(flash());
//every view automatically uses ejsLayouts, reusable headers & footers
app.use(ejsLayouts);
// encrypts cookie using this secret; use express.session() before passport.session() to ensure that the login session is restored in the correct order
app.use(session({ secret: 'STYLEBAGS-EXPRESS-AUTH' }));
// passport.initialize() middleware is required to initialize Passport.
app.use(passport.initialize());
// If your application uses persistent login sessions, passport.session()
app.use(passport.session());
// Set Passport configuration
require('./config/passport')(passport);
app.use(methodOverride(function(request, response) {
  if(request.body && typeof request.body === 'object' && '_method' in request.body) {
    var method = request.body._method;
    delete request.body._method;
    return method;
  }
}));
// allow global access to currentUser variable, this must be after require passport
app.use(function(req, res, next) {
  global.currentUser = req.user;
  next();
});

app.use('/', routes);
app.use('/users', users);

//FACEBOOK AUTHENTICATION
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
