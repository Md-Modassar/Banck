const userMode =require("../Models/UserModel")
//const accuntModel=require("../Models/AccountMode");
const { default: mongoose } = require("mongoose");
const ObjectId=mongoose.Types.ObjectId
const jwt=require('jsonwebtoken')
const isValidEmail = function (value) {
   let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
   if (emailRegex.test(value)) return true;
 };
 const dotenv=require("dotenv");
 dotenv.config()

exports.userConteroller=async(req,res)=>{
   try{
      const data=req.body
      const {name,email,phone,password,account}=data

      if(!name){
         return res.status(400).send({status:false,message:"Name is required field"})
      }
      if(!email){
         return res.status(400).send({status:false,message:"Email is required field"})
      }
      if(!phone){
         return res.status(400).send({status:false,message:"phone is required field"})
      }
      if(!password){
         return res.status(400).send({status:false,message:"password is required field"})
      }
      if(!account.accountType){
         return res.status(400).send({status:false,message:"account of accountType is required field"})
      }
      if(!account.balance){
         return res.status(400).send({status:false,message:"account of balance is required field"})
      }
      if(!isValidEmail(email)){
         return res.status(400).send({status:false,message:"It is not email"})
      }
      const counts=await userMode.find()
      account.accountNumber=counts.length+1
      const emailExist=await userMode.findOne({email:email})

      if(emailExist){
         return res.status(400).send({statue:false,message:"This Email already exist"})
      }

      const savedata=await userMode.create(data)
      return res.status(201).send({statue:true,savedata})
 

      

   }catch(err){
    return res.status(500).send({statue:false,message:err.message})
   }
}

exports.login=async(req,res)=>{
  try{
     const data=req.body
     const {email,password}=data

     if(!email){
      return res.status(400).send({status:false,message:"Email is required field"})
   }
   if(!password){
      return res.status(400).send({status:false,message:"password is required field"})
   }

   if(!isValidEmail(email)){
      return res.status(400).send({status:false,message:"It is not email"})
   }

   const emailExist=await userMode.findOne({email:email})

   if(!emailExist){
      return res.status(400).send({statue:false,message:"This Email already exist"})
   }
  
   const token= jwt.sign({userid:emailExist._id},"This is my key")
    
   return res.status(201).send({status:true,token,emailExist})


  }catch(err){
    return res.status(500).send({status:false,message:err.message})
  }
}
exports.forgetpassword=async(req,res)=>{
   try{
      const data=req.body
      const {email,newpassword}=data
 
      if(!email){
       return res.status(400).send({status:false,message:"Email is required field"})
    }
    if(!newpassword){
       return res.status(400).send({status:false,message:"password is required field"})
    }
 
    if(!isValidEmail(email)){
       return res.status(400).send({status:false,message:"It is not email"})
    }
 
    const emailExist=await userMode.findOne({email:email})
 
    if(!emailExist){
       return res.status(400).send({statue:false,message:"This Email already exist"})
    }

    const updatepassword=await userMode.findOneAndUpdate({email:email} ,{$set:{password:newpassword}},{new:true})
    return res.status(200).send({status:true,message:"password update successfully"})
   }catch(err){
      return res.status(500).send({status:false,message:err.message})
   }
}

exports.getallacount=async(req,res)=>{
  try{
      const getusers=await userMode.find()
      return res.status(200).send({status:true,getusers})
  }catch(err){
   return res.status(500).send({status:false,message:err.message})
  }
}

exports.getusertbyId=async(req,res)=>{
   try{
        const {id}=req.params

        if(!id){
         return res.status(400).send({status:false,message:"Please enter id"})
        }

        if(!ObjectId.isValid(id)){
         return res.status(400).send({status:false,message:"Please enter valid id"})
        }
        /*
        "accountNumber":2,
         "accountType":"Savings",
         "balance":7000
        */
        

        const user=await userMode.findById(id)

        return res.status(200).send({status:true,user})

   }catch(err){
      return res.status(500).send({statue:false,message:err.message})
   }
}

exports.update=async(req,res)=>{
   try{
     const data=req.body
     const {id}=req.params

     if(data.accountNumber){
      await userMode.findByIdAndUpdate(id,{$set:{'account.accountNumber':data.accountNumber}})
    }
    if(data.accountType){
     await userMode.findByIdAndUpdate(id,{$set:{'account.accountType':data.accountType}})
   }
   if(data.balance){
     await userMode.findByIdAndUpdate(id,{$set:{'account.balance':data.balance}})
   }

     const updatedata=await userMode.findByIdAndUpdate(id,data,{new:true})
     res.status(200).send({status:true,updatedata})
   }catch(err){
      return res.status(500).send({status:false,message:err.message})
   }
}

exports.deleteuser=async(req,res)=>{
   try{
        const {id}=req.params
        
        if(!ObjectId.isValid(id)){
         return res.status(400).send({status:false,message:"please enter valid id"})

        }

        const data=await userMode.findByIdAndDelete(id)

      return res.status(200).send({status:true,message:"Delete user Sccussfully"})
   }catch(err){
      return res.status(500).send({status:true,message:err.message})
   }
}