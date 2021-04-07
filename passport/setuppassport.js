const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const User=require('../models/User');
const FacebookStrategy=require('passport-facebook').Strategy;
module.exports=function(){
    passport.serializeUser(function(user,done){
        return done(null,user._id);
    })
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            return done(err,user);
        })
    });
    passport.use(new FacebookStrategy({
        clientID:'340114590104049',
        clientSecret:'0c474845bc6d18a907e63106da87c809',
        callbackURL:'http://localhost:3000/auth/facebook/callback'
    },function(accessToken, refreshToken, profile, done){   
        console.log(accessToken,refreshToken,profile,done)
    }))

    passport.use('local-login',new localStrategy({passReqToCallback:true,
    usernameField:'username',
    passwordField:'password'},
    function(req,username,password,done){
//            console.log(req.body)   
        User.findOne({$or:[{username:username},{email:username},{phone_Number:username}]},function(err,user){
                if(err) {return done(err);}
                if(!user){
                    return done(null,false,{message:'no user has that usename'})
                }
                user.checkPassword(password,function(err,isMatch){
                    if(err){
                        return done(err);
                    }
                    if(!isMatch){
                        return done(null,false,{message:'Username or password is incorrect'})
                    }
                    
                    return done(null,user)
                    
                })
            })
    }))
}