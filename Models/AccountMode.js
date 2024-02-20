const mongoose =require("mongoose");
const ObjectId =mongoose.Schema.Types.ObjectId

const accountSchema=new mongoose.Schema({
    photo:String,
    userId:{type:ObjectId,ref:"users"},
    accountType:String,
    balance:Number,
    openingDate:{type:Date,default: Date.now}

},{timeseries:true}) 

module.exports=mongoose.model('account',accountSchema)