
const { default: mongoose } = require("mongoose");
const account=require("../Models/AccountMode");
const userModel =require("../Models/UserModel")
const ObjectId=mongoose.Types.ObjectId

exports.accounCrt=async(req,res)=>{
    try{
      const data=req.body
      const {photo,userId,accountType,balance}=data
      if(!photo){
        return res.status(400).send({status:false,message:"Please enter photo"})
      }
      if(!userId){
        return res.status(400).send({status:false,message:"Please enter email"})
      }
      if(!accountType){
        return res.status(400).send({status:false,message:"Please enter accountType"})
      }
      if(!balance){
        return res.status(400).send({status:false,message:"Please enter balance"})
      }
      if(!ObjectId.isValid(userId)){
        return res.status(400).send({status:false,message:"Please enter valied userid"})
      }
      const userexist=await userModel.findOne(userId)
      if(!userexist){
        return res.status(400).send({status:false,message:"This userid is not valide"})
      }
      const savedata=await account.create(data)
      return res.status(201).send({status:true,savedata})
    }catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}
