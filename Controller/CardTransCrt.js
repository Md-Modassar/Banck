const { default: mongoose } = require("mongoose");
const creditCardModel=require("../Models/CreditCardModel")
const credicardTransModel=require("../Models/creditardTrans");
const UserModel = require("../Models/UserModel");
const ObjectId =mongoose.Types.ObjectId


exports.CreditCrdTrnCtr=async(req,res)=>{
    try{
        
       const data=req.body
       
       const { creditcardNo,description,amount}=data

       if(!creditcardNo){
        return res.status(400).send({status:false,message:"Please enter required field"})
       }
       if(!description){
        return res.status(400).send({status:false,message:"Please enter required field"})
       }
       if(!amount){
        return res.status(400).send({status:false,message:"Please enter required field"})
       }

       if(!ObjectId.isValid(creditcardNo))
       {
        return res.status(400).send({status:false,message:"Please enter valid creditcardNo"})
       }

      const creditcardexist=await creditCardModel.findById(creditcardNo)

      if(!creditcardexist){
          return res.status(400).send({status:false,message:"This is not right credicardNo"})
      }
      if(creditcardexist.balance<parseInt(amount))
        {
            return res.status(400).send({status:false,message:"Your credit card balnce low"})
        }

      const balance=creditcardexist.balance-parseInt(amount)

      await creditCardModel.findByIdAndUpdate(creditcardNo,{$set:{balance:balance}})
       
      const savedata=await credicardTransModel.create(data)

      return res.status(201).send({status:true,savedata})
     

    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}
exports.getcreditcardbyid=async(req,res)=>{
    try{
       const {id}=req.params
       if(!ObjectId.isValid(id)){
        return res.status(400).send({status:false,message:"Please enter valide userid"})
       }

       const userexist=await UserModel.findById(id)
       let object={
        userId:userexist._id,
        accountNumber:userexist.account.accountNumber,
        balance:userexist.account.balance,

       }

       const credicardNo=await creditCardModel.findOne({userId:id})
       if(!credicardNo){
        return res.status(400).send({status:false,message:"this user don't have credit card"})
       }
       object.creditcardNumber=credicardNo._id
       object.creditbalance=credicardNo.balance

       const data=await credicardTransModel.find({creditcardNo:credicardNo._id})
       object.data=data

       return res.status(200).send({stactus:true,object})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}