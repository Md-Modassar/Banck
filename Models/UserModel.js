const mongoose =require("mongoose")

const userMode =new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    phone:{type:Number,unique:true},
    password:String,
    photo:String,
    account:{
      accountNumber:Number,
      accountType:String,
      balance:Number,
      openingdate:{
        type: Date,
        default: Date.now,
      },
    },
   
      admin:{type:Number,default:0}
},{timestamps:true,
})

module.exports=mongoose.model("User",userMode)
