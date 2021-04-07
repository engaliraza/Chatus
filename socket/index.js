'use strict';
var redis=require('redis').createClient;
var adapter=require('socket.io-redis');
var config=require('../config');
var fs=require('fs');
var messageRoom=require('../models/rooms');
var messages=require('../models/messaging');
var User =require('../models/User');
const objectId=require('mongoose').Types.ObjectId
var ioEvents=function(io){
    
    io.of('/notifications').on('connection',function(socket){
    
        if(socket.request.session.passport==null){
            return;
        }
        let room=""; 
        User.findOne({_id:socket.request.session.passport.user}).select({messageRoom:1, lastLogin:1,isOnline:1,isAdmin:1})
        .exec(function(err,user){
        
            if(user){

             room=user.messageRoom
            user.lastLogin=Date.now()
            
            user.save()
            user.isOnline=true
             socket.join(room)
            }
        })
          
        socket.on('sendMessage',(details)=>{
            if(socket.request.session.passport==null){
                return;
            }

                })
           
                

    socket.on('disconnect',function(){
        User.findOne({_id:socket.request.session.passport.user}).exec(function(err,user){
            if(user){

                user.messageRooms.map((el,i)=>{
                    
                socket.leave(el)
            })
            
            user.isOnline=false
            
            user.save()
            
        }
        })
        })
    })
    io.of('/messanger').on('connection',function(socket){

        if(socket.request.session.passport==null||socket.request.session.passport.user==null){
            return;
        }
        console.log(socket.request.session.passport.user)
        let msgRoom=[];
        
        User.findOne({_id:socket.request.session.passport.user}).select({messageRooms:1}).exec(function(err,user){
           user.messageRooms.map((el,i)=>{
               socket.join(el)
            })
            let el=[]
            socket.on('getMyMsgg',function(){
                user.messageRooms.map((e,i)=>{
                    el.push(objectId(e))
                })
                messages.aggregate(
                    [
                        {$match:{roomId:{$in:el}}},
                        
                        {
                        $group:
                        {
                            userId:{$last:"$_userId"},
                            message:{$last:"$message"},
                            _id: "$roomId",
                            lastMessageDate: { $last: "$createdAt" }                      
                        }
                    },
                    { $sort: { createdAt: 1} },
                  
                    ]
                ,function(err,docs){
                    if(err){
                        console.log(err);
                        return;
                    }
                    User.findOne({_id:socket.request.session.passport.user}).exec(function(err,user){

                        let ar=[],ar2=[];
                        user.messageRooms.map((gl,j)=>{
                            if(gl!=socket.request.session.passport.user  ){
                                ar.push(gl)
                                ar2.unshift(gl)
                                
                            }else if(user.isAdmin==false){
                                ar.push(gl)
                                ar2.unshift(gl)
                            }   
                        
                
                        })
                User.find({_id:ar}).select({"photo":1,"username":1,"isAdmin":1}).exec(function(err,user){
                            if(err){
                                console.log(err)
                    return;
                }
                if(!user.length){
                        socket.emit("userDetails",{noDetails:true})        
                        return;
                    }
                    let users=[];
                    user.map(ob=>{
                        let index=ar.indexOf(ob._id+"")
                        users.splice(index,0,ob)
                    })
                    socket.emit("userDetails",users,ar2,ar,docs,socket.request.session.passport.user)
                })    
                
                })
            })
            })
            
        })
             socket.on("getMyConvo",function(msgs){
                
                if(socket.request.session.passport==null){
                    return;
            }
            messages.find({roomId:msgs.otherId}).sort({createdAt:1}).exec((err,message)=>{
                if(err){    
                    return; 
                }
                console.log(message,'message')
                User.findOne({_id:msgs.otherId}).select({"onLine":1,"lastLogin":1}).exec(function(err,stats){
                    if(err){
                        console.log(err);
                        return; 
                    }

                    if(stats.isOnline){
                        
                    socket.emit("giveMyConvo",{message:message,onLine:true,isAdmin});
                }
                else{
                    socket.emit("giveMyConvo",{message:message,lastLogin:stats.lastLogin});                    
                    }
            })    
            })
        })
  


        socket.on('addMessage',function(msg){
            if(socket.request.session.passport==null){
                return;
            }
            else{
                User.findOne({isAdmin:true}).exec(function(err,user){
                    var message=new messages({
                        _userId:msg.id, 
                        roomId:user._id.toString()==msg.id?msg.otherId:msg.id,
                        message:msg.text   
                    })
                    message.save().then(data=>{
       
                        if(err){
                            console.log(err)
                            socket.to(msg.id).emit("errSendMsg")
                            return;  
                        }
                        if(user._id.toString()!=msg.id){
                           let sendMessage=false
                           console.log(user.isOnline,'afss  ')
                           if(!user.isOnline){
                               let text=""
                               if(msg.text==="Hi"){
                                text="Hello admin is offline you will get the response soon"
                                sendMessage =true
                            }
                                if(msg.text==="Hello"){
                                    text="Hi admin is not available he will get back to you soon"
                                    sendMessage =true
                                }
                                if(msg.text==="tell me more about this university"){    
                                    text= "It is faboulous"
                                    sendMessage =true
                                }
                                if(sendMessage){

                                    let message=new messages({
                                    _userId:user._id, 
                                    roomId:msg.id,
                                    message:text   
                                })
                                    message.save().then(data=>{

                                        
                                          try{
                                        socket.emit('newMessage',data)
                                            
                                        }catch(error){
                                            console.log(error)
                                        }
                                    })
                                    }
                               }else{
                                let message={
                                    _userId:msg.id, 
                                    roomId:user._id.toString()==msg.id?msg.otherId:msg.id,
                                    message:msg.text,
                                    createdAt:Date.now()   
                                }   
                          
                                   try{
                                    console.log(message,'message')
                                    socket.broadcast.to(msg.id).emit('newMessage',message)
                                    }catch(error){
                                        console.log(error)
                                    }
                           
                               }
                        }
                            else{
                                console.log(msg.otherId,user._id)
                                console.log( msg,'gggg')
                                socket.broadcast.to(msg.otherId).emit('newMessage',message)
                            
                        }
                    })
                
        }) 
    }
})
       
        socket.on('disconnect',function(){  
            socket.leave(msgRoom);
            User.findByIdAndUpdate(socket.request.session.passport.user,{onLine:false},(err)=>{
                if(err){
                    return;
                }
           })  
         })
        })    
    }
var init=function(app){
    var server=require('http').Server(app);
    var io=require('socket.io')(server);
    
 let pubClient=redis(config.redis.port,config.redis.host,{auth_pass:config.redis.password});
    let subClient=redis(config.redis.port,config.redis.host,{auth_pass:config.redis.password,return_buffer:true});
    io.adapter(adapter({pubClient,subClient}));
    io.use((socket,next)=>{
        require('../session')(socket.request,{},next);
    });
    io.set('transports',['websocket']);
    ioEvents(io);
    return server;
}
module.exports=init