const { default: mongoose } = require("mongoose");
const accutTranModel=require("../Models/AccounTrans")
const userModel =require("../Models/UserModel");
const creditModel =require("../Models/CreditCardModel")
const credittarnModle=require("../Models/creditardTrans")
const ObjectId =mongoose.Types.ObjectId

exports.accuntran=async(req,res)=>{
    try{
       const data=req.body

       const {userId,description,amount}=data
       if(!userId)
         {
            return res.status(400).send({status:false,message:"Please enter required field"})

         }
         if(!description){
            return res.status(400).send({status:false,message:"Please enter required field"})
         }
         if(!amount){
            return res.status(400).send({status:false,message:"Please enter required field"})
         }
         
         if(!ObjectId.isValid(userId)){
            return res.status(400).send({status:false,message:"Please enter valide userid"})
         }

         
         const userexist=await userModel.findById(userId)
         if(!userexist){
            return res.status(400).send({status:false,message:"Please enter valid userId"})
         }
         if(data.Transfer_AccountNo)
           {
            //const accountno=data.Transfer_AccountNo
            const exsitaccnt=await userModel.findOne({'account.accountNumber':data.Transfer_AccountNo})
            if(!exsitaccnt){
                return res.status(400).send({status:false,message:"Please enter valid accountNo"})
            }

            let balance=exsitaccnt.account.balance+parseInt(amount)
            await userModel.findByIdAndUpdate(exsitaccnt._id, { $set: { 'account.balance': balance }})


           }

         
         if(description==="Withdrawal"||description==="Transfer")
         {
            const balance=userexist.account.balance-parseInt(amount)
           // const parsedBalance = parseFloat(balance)
            await userModel.findByIdAndUpdate(userId,{$set:{"account.balance":balance}})
         }else{
            const balance=userexist.account.balance+parseInt(amount)
            await userModel.findByIdAndUpdate(userId,{$set:{"account.balance":balance}})
         }

         const savedata=await accutTranModel.create(data)

         return res.status(201).send({status:true,savedata})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

exports.alltransect=async(req,res)=>{
   try{
     const userId=req.params.userId
     let data=[]
     let object={
      userId:userId,
     }

     if(!ObjectId.isValid(userId)){
    return res.status(400).send({status:false,message:"Please enter valide userid"})
     }

     const userexist=await userModel.findById(userId)
     if(!userexist){
       return res.status(400).send({status:false,message:"Please enter valid userid"})
     }
     object.accountNumber=userexist.account.accountNumber


     const accunttrans=await accutTranModel.find({userId:userId})
      data=[...accunttrans]

      const credicardno=await creditModel.findOne({userId:userId})
     
      const cridetcardtrns=await credittarnModle.find({creditcardNo:credicardno._id})
      data=[...cridetcardtrns,...data]
     object.data=data
      return res.status(200).send({status:true,object})
   }catch(err){
      return res.status(500).send({status:false,message:err.message})
   }
}
