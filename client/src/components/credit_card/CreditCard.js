import React, { useEffect, useState } from 'react'
import "./creditcard.css"
//import data from "../data/credit-carddata"
import Header from '../header/Header'
import axios from "axios"

const CreditCard = () => {
    //const data1 =data[0]
    const [data,setData]=useState([])
    const storedDataString = localStorage.getItem("auth");

    // Parse the JSON string into an object
    const storedData = JSON.parse(storedDataString);
    
    // Access the _id property from the parsed object
    const id = storedData.emailExist._id;
    console.log("cardid",id)

    const getusers=async()=>{
      try{
          const result=await axios.get(`http://localhost:8080/getcreditcard/${id}`)
         console.log("rsult=--------0000-",result?.data?.object)
          //result.data.status
          console.log("hi")
          if(result){ 
           setData(result.data.object)
            console.log(data)
        }
      
       }catch(err){
   
        console.log({meassage:err.meassage})
    
       }
  }

  useEffect(()=>{
    getusers()
  },[])


  return (
    <>
    <Header/>
    <div className='creditecard'>
        <h1>Credite Card</h1>
         <div className='userid'><span className='useridspan'>UserId : </span><span style={{fontSize:"12px"}}>{data?.userId}</span></div>
         <div className='divno'>
            <div className='creditid'><span className='creditspan'>Credit Card No.</span><span>{data?.creditcardNumber}</span></div>
            <div className='accn_id'><span className='accnspan'>Acccount No.</span><span>{data?.accountNumber}</span></div>
         </div>
         <div className='credit-head'>
            <span>Tran_Id</span>
            <span>Amount</span>
            <span>Transction Type</span>
            <span>Date</span>
            <span>Action</span>
         </div>
         <div className='credit-container'>
            {
                data?.data?.map((product,i)=>(
                    <div className='credit-card'>
                        <span style={{fontSize:"10px"}}>{product._id}</span>
                        <span>{product.amount}</span>
                        <span>{product.description}</span>
                        <span style={{fontSize:"12px"}}>{product.date}</span>  
                    </div>
                
                ))
            }
         </div>
         <div className='divblance'>
            <div className='ac_blan'><span className='acblspan'>Acccount Blance</span><span>{data?.balance} \₹</span></div>
            <div className='cr_bl'><span className='crblspan'>CreditCard Blance</span><span>{data?.creditbalance} \₹</span></div>
         </div>
     
    </div>
    </>
  )
}

export default CreditCard