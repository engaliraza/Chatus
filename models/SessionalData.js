const mongoose=require('mongoose');
const sessionalData=mongoose.Schema({
    username:{type:String,required:true,trim:true},
    code:{type:String,trim:true},
    pCode:{type:String,trim:true},
    type:{type:String,trim:true},
})

var Sess=mongoose.model('Sess',sessionalData);
module.exports=Sess;