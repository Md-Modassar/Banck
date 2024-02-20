const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;

const creditCardTrans=new mongoose.Schema({
    creditcardNo:{type:ObjectId,ref:"credits"},
    description:String,
    amount:Number,
    date:{type:Date,default:Date.now}
},{timestamps:true})

module.exports=mongoose.model('creditcardtran',creditCardTrans)