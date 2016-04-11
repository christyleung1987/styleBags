var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      // If a user is found it will be assigned to req.user
      done(err, user);
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, function(req, email, password, done) {
    // Find a user with this email
    User.findOne({ 'local.email' : email }, function(err, user) {
      if (err) return done(err);
      // If there is a user with this email
      if (user) {
        return done(null, false, req.flash('errorMessage', 'This email is already used!'));
      } else {
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = User.hash(password);

        newUser.save(function(err, user) {
          if (err) return done(err);
          return done(null, user);
        });
      }
    });
  }));

    passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, function(req, email, password, done) {

      // Search for a use with this email
      User.findOne({ 'local.email': email }, function(err, user) {
        if (err) return done(err);
        // If no user is found
        if (!user) return done(null, false, req.flash('errorMessage', 'No user found.'));
        // Check if the password is correct
        if (!user.validPassword(password)) return done(null, false, req.flash('errorMessage', 'Oops wrong password!'));
        return done(null, user);
      });
    }));

  //FACEBOOK PASSPORT STRATEGY
  passport.use(new FacebookStrategy({
      clientID: '224660214563132',
      clientSecret: '32a4d611f1fd27f1dd11f8ba3f0aa7c1',
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));
}
