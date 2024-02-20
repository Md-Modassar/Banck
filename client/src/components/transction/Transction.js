import React, { useEffect, useState } from 'react'
import "./transction.css"
//import data from "../data/transactionData"
import Header from '../header/Header'
import { useAuth } from '../../context/auth'
import axios from "axios"

const Transction = () => {
  //const [auth]=useAuth()
  const storedDataString = localStorage.getItem("auth");

  // Parse the JSON string into an object
  const storedData = JSON.parse(storedDataString);
  
  // Access the _id property from the parsed object
  const id = storedData.emailExist._id;
  
   console.log(id)
  //const data1=[]//=data[0]
  const [data,setData]=useState([])
    const getusers=async()=>{
        try{
            const result=await axios.get(`http://localhost:8080/transction/${id}`)
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
    <div className='transction'>
       <span className='span1'>Account No. {data?.accountNumber}</span>
       <div className='tarnction_head'>
        <a>Trans_Id</a>
        <a>Tran_Amount</a>
        <a>Trans_Type</a>
        <a>Trans_Date</a>
        <a>Action</a>
       </div>
       <div className='tarnction_container'>
          {
            data?.data?.map((product,i)=>(
                <div className='transction_card'>
                    <span style={{fontSize:"10px"}}>{product?._id}</span>
                    <span>{product?.amount}</span>
                    <span>{product?.description}</span>
                    <span style={{fontSize:"10px"}}>{product?.date}</span>
                    <span>Action</span>
                </div>
            ))
          }
       </div>
    </div>
    </>
  )
}

export default Transction