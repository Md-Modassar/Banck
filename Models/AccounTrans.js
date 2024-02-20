const mongoose=require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId

const TransAccnSche=new mongoose.Schema({
    userId:{type:ObjectId,ref:'users'},
    AccountNo:Number,
    description:String,
    amount:Number,
    date:{type:Date, default:Date.now },
    Transfer_AccountNo:{type:Number,default:undefined},

},{timestamps:true})

module.exports=mongoose.model('accuntran',TransAccnSche)