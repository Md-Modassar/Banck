import React, { useEffect, useState } from 'react'
import "./useraccountdet.css"
import profile from "../../images/profile.png"
import Header from '../header/Header'
//import data1 from "../data/userdata"
import { useParams,useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
//import { Link, useLocation, useNavigate } from 'react-router-dom'
import {BASE_URL} from "../../server/server"
const UserCountde = () => {
  const navigate=useNavigate();
  const location =useLocation();
    const {id}=useParams()
    console.log(id)
    const [data,setData]=useState([])
    const [data1,setData1]=useState([])

    const getdata=async()=>{
      try{
        const result=await axios.get(`${BASE_URL}/user/${id}`)
        //console.log("rsult=--------0000-",result.data.getusers)
        //result.data.status
        if(result.data.status){ 
          setData(result.data.user)
          console.log(data)
      }
    
     }catch(err){
 
      console.log({meassage:err.meassage})
  
     }
    }

    const findcreditcard=async()=>{
      try{
        const result=await axios.get(`${BASE_URL}/checkcreditcard/${id}`)
        //console.log("rsult=--------0000-",result.data.data)
        //result.data.status
        if(result){ 
          setData1(result.data.data)
          console.log(data1)
      }
    
     }catch(err){
 
      console.log({meassage:err.meassage})
  
     }
    }
    

    useEffect(()=>{
     getdata()
     findcreditcard()
    },[])
    const storedDataString = localStorage.getItem("auth");

    // Parse the JSON string into an object
    const storedData = JSON.parse(storedDataString);
    
    // Access the _id property from the parsed object
    //const id = storedData.emailExist._id;

    const object={};
       object.userId=id
       object.accountNumber= storedData?.emailExist?.account?.accountNumber
      
       let status
      const heandelSubmit=async()=>{
        try{
          const result=await axios.post(`${BASE_URL}/creditcard`,object)
          //console.log("rsult=--------0000-",result.data)
          //status=result.data.status
          if(result){ 
            //openPopUp()
          //   setAuth({
          //     ...auth,
          //     user:result.data.emailExist,
          //     token:result.data.token
      
          //   })
           // localStorage.setItem("auth",JSON.stringify(result.data))
            navigate(location.state||'/')
           // console.log("successfull",result)
            //console.log("result",result.data)
        }
      
       }catch(err){
      //  console.log("error===",err.response.data)
        status=err.response.data.status
      ///  console.log("login--",status)
       // openPopUp()
       }
     }
    

  return (
    <>
    <Header/>
    <div className='usercount'>
        <h1>Details of Account No.{data?.account?.accountNumber}</h1>
        <span className='user-head'>
            UserId: {data?._id}
        </span>
        
            <div className='user-detail-in'>
           <div>
            <img src={data?.photo} alt=''/>
           </div>
           <div className='user-text'>
           <div >
             <div className='name'><span>Name : </span><span>{data?.name}</span></div>
           </div>
           <div>
             <div className='email'><span>Email:</span><span>{data?.email}</span></div>
           </div>
           <div>
             <div className='phone'><span>Phone:</span><span>{data?.phone}</span></div>
           </div>
           </div>
        
        </div>
        
        <div className='account-detail'>
           <h1>
            Account details
           </h1>
            <div className='account-text'>
             <div className='acc_no'><span>Account No. :</span><span>{data?.account?.accountNumber}</span></div>
             <div className='acc_type'><span>Account Type :</span><span>{data?.account?.accountType}</span></div>
             <div className='open'><span>Opening Date :</span><span style={{fontSize:"15px"}}>{data?.account?.openingdate}</span></div>
             <div className='av_b'><span>Availble Balance</span><span> ₹ {data?.account?.balance}</span></div>
            </div>
        </div>
        {data1?(<></>):
        (<div className='stb'>
          <h1>You want to use credit Card then click this button</h1>
          <button className='credit_but' onClick={ heandelSubmit}>Credit Card</button>
       </div>)
      }
    </div>
    </>
  )
}

export default UserCountde