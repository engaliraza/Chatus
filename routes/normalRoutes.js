const express=require('express');
const router=express.Router();
const passport=require('passport');
const User=require('../models/User');
const path=require('path');
const Messages =require('../models/messaging')
const sessions =require('../models/sessions')
function ensureAuth(req,res,next){
  if(!req.isAuthenticated()){
    res.sendFile(path.resolve(__dirname, '../views', 'ensure.html'));  
    return;
  }
  else{
      next();
      }
}
router.get('/',(req,res,next)=>{
  res.sendFile(path.resolve(__dirname, '../views', 'index.html'));
});
router.get('/login',function(req,res,next){
  res.sendFile(path.resolve(__dirname, '../views', 'index.html'));
})
router.get('/messanger',function(req,res,next){
  res.sendFile(path.resolve(__dirname, '../views', 'index.html'));
})

router.get('/logout',ensureAuth,function(req,res,next){
 
 sessions.remove({username :req.user.username },function(err){
        if(err){
          return res.send({error:err.message})
        }
        req.user.isOnline=false
        req.user.save()
        req.logOut();
        res.send({logout:true}) 
        })
   })

router.post("/login",function(req,res,next){
  passport.authenticate('local-login',function (err, user, message){
    if (err) {
    return res.send(err.message)
    }
    if (user) {
      req.logIn(user, loginErr => {
        if(loginErr) {
          console.log(loginErr)
          res.json({ success: false, message: loginErr })
          return
        }
         res.send({user:user}); 
        return;
      })
  }
    if(message){
       return res.send({message:message})
    }
  })(req, res, next);
})

router.post("/signup", function (req, res, next) {
  let username = req.body.username;
    User.findOne({ $or: [{ username: username }] }, function (err, user) {

    if (err) { 
      res.send({error:'Could not proceed the request'});
      return ; 
    }
    if (user) {
      
      return res.send({message:"user already exists with this username"});
    }
      let password = req.body.password;
      User.findOne({isAdmin:true}).exec(function(err,admin){
    let newUser = new User({
      username: username,
      password: password,
      photo:'https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg'       
     });
  newUser.save(next)
  messageRooms=newUser._id
  newUser.messageRooms=[newUser._id]
  newUser.save()
    
    const newMessage=new Messages({
      _userId:newUser._id,
      roomId:newUser._id,
      message:'Hi iam a new user',
    })
    newMessage.save().then(doc=>{
      admin.messageRooms.push(newUser._id)
      admin.save()  
    })
    res.send({message:'successfully registered the user'})
    }) 

  });

})
router.post('/users',(req,res,next)=>{
  const user=new User({
    username:"admin",
    password:"admin1234",
    isAdmin:true
  })
  user.save()
  res.send({message:'success'})
})
router.get('/getUsernme',ensureAuth,function(req,res){
  res.send({username:req.user.username,
  isAdmin:req.user.isAdmin})
})

module.exports=router;