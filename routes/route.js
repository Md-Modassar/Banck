const express =require('express')
const router =express.Router()
const { userConteroller, login, getallacount, getusertbyId, update, deleteuser } =require("../Controller/UserCont")
const { accounCrt } =require("../Controller/accountCant")
const {} =require("../Controller/accountCant")
const { accuntran, alltransect } = require('../Controller/accouttran')
const { creditCardCnt } =require("../Controller/CreditCardCant")
const { CreditCrdTrnCtr, getcreditcardbyid }=require("../Controller/CardTransCrt")
router.post("/creatuser",userConteroller)
router.post("/login",login)
router.put("/updateuser/:id",update)
router.delete("/userdelete/:id",deleteuser)


//account router

router.post("/account",accounCrt)
router.get("/getalluser",getallacount)
router.get("/user/:id",getusertbyId)
router.get("/transction/:userId",alltransect)

//account tarns
router.post("/transaction",accuntran)

//readit card
router.post("/creditcard",creditCardCnt)
router.get("/getcreditcard/:id",getcreditcardbyid)

//creditcard transction
router.post("/credicardtrans",CreditCrdTrnCtr)

module.exports=router;