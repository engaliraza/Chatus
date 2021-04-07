var mongoose=require('mongoose');
var roomSchema=mongoose.Schema({
    _userId:[String],
    createdAt:{type:Date,default:Date.now()}
});
//roomSchema.index({"_id":1});
var rooms=mongoose.model('rooms',roomSchema);
module.exports=rooms;
