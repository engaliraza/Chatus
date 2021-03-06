const mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs');
var SALT_FACTOR=10;
var userSchema=mongoose.Schema({
    username:{type:String,requird:true, index:{unique:true,dropDups:true}},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false},
    photo:{type:String,default:true},
    lastLogin:{type:Date},
    messageRooms:{type:[mongoose.Schema.Types.ObjectId]},
    isOnline:{type:Boolean,default:false,required:true}
   });
var noop=function(){};
userSchema.pre("save", function(done) {
  var user = this;

  if (!user.isModified("password")) {
    return done();
  }

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err); }
    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
      if (err) { return done(err); }
      user.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};



var User = mongoose.model("User", userSchema);

module.exports = User;