const mongoose =require("mongoose");
const ObjectId =mongoose.Schema.Types.ObjectId

const CreditSchema=new mongoose.Schema({
    userId:{type:ObjectId,ref:'users'},
    accountNumber:Number,
    balance:{type:Number,default:5000},
    date:{type:Date,default:Date.now}
     
},{timestamps:true})

module.exports=mongoose.model('credit',CreditSchema);
