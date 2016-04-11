var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  local : {
    //username: {unique: true},
    email: {type: String},
    password: {type: String},
    facebookId: {type: Number}
  }

});

userSchema.statics.hash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

userSchema.statics.findOrCreate = function findOrCreate(profile, cb){
  var userObj = new this();
  this.findOne({'local.facebookId' : profile.facebookId},function(err,result){
    if(!result) {
      userObj.local.facebookId = profile.facebookId;
      userObj.save(cb);
    } else {
      cb(err,result);
    }
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
