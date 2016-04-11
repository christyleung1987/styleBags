var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  local : {
    //username: {unique: true},
    email: {type: String, unique: true},
    password: {type: String},
    facebookId: {type: Number, unique: true}
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
  this.findOne({_id : profile.id},function(err,result){
    if(!result) {
      console.log(profile);
      console.log(profile.facebookId);
      userObj.facebookId = profile.facebookId;
      userObj.save(cb);
      console.log(userObj);
    } else {
      console.log("#2")
      cb(err,result);
    }
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
