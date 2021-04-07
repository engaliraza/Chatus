const SessionalData=require('../models/SessionalData');
const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const User=require('../models/User');
const encr=require('../models/encr');
module.exports=function(){
    passport.serializeUser(function(user,done){
        return done(null,user._id);
    })
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            return done(err,user);
        })
    });
    passport.use('abc',new localStrategy({
                passReqToCallback:true,
                usernameField:'username',
                passwordField:'password'
    },function(req,username,password,done){
       var use =encr.decrypt(username)
            SessionalData.findOne({$and:[{username:use},{password:password}]},function(err,user){
            if(err){
                console.log(err)
                done(null,false,'Could not proceed with the request');
                return 
            }
            if(!user){
                console.log('User not found');
                done(null,false,'Could not proceed with the request' );
                return;
            }
            if(user){
                done(null,user)
                return;
                    }
                 })
            })
        )
    
    }