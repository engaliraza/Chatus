const mongoose=require('mongoose');
var sessionSchema=mongoose.Schema({
    session:{type:String,required:true},
    expires:{type:Date,required:true}
});
var sessions=mongoose.model("sessions",sessionSchema);
module.exports=sessions;