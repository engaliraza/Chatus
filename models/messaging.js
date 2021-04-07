const mongoose=require('mongoose');

const messengerSchema=mongoose.Schema({
    _userId:{type:mongoose.Schema.Types.ObjectId,refs:'Users'},
    roomId:{type:mongoose.Schema.Types.ObjectId,required:true},
    message:{type:String,trim:true},
    deletedFrom1:{type:Boolean,default:false},
    deletedFrom2:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()},
    seen:Boolean,
    seenDate:Date
})
var messenger=mongoose.model("messenger",messengerSchema);
module.exports=messenger;