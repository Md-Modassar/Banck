const CrediModel=require("../Models/CreditCardModel")
const userModel=require("../Models/UserModel")
const accountModel=require("../Models/AccountMode")
const { default: mongoose } = require("mongoose")

const ObjectId =mongoose.Types.ObjectId

exports.creditCardCnt=async(req,res)=>{
    try{
       const data=req.body
       const {userId,accountNumber,}=data
       if(!userId){
        return res.status(400).send({status:false,message:"Please enter required field"})
       }
       if(!accountNumber){
        return res.status(400).send({status:false,message:"Please enter required field"})
       }

       if(!ObjectId.isValid(userId)){
         return res.status(400).send({status:false,message:"Please enter valid userid"})
       }

       const userexist=await userModel.findById(userId)

       if(!userexist)
         {
           return res.status(400).send({status:false,message:"Please Enter valide userId"})
         }
         
        


            
         
            if(userexist.account.accountNumber!==accountNumber){
             return res.status(400).send({status:false,message:"this is not user account_No"})
            }


         const savedata=await CrediModel.create(data)

         return res.status(201).send({status:true,savedata})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

