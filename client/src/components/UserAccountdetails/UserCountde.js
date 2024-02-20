import React, { useEffect, useState } from 'react'
import "./useraccountdet.css"
import profile from "../../images/profile.png"
import Header from '../header/Header'
//import data1 from "../data/userdata"
import { useParams } from 'react-router-dom'
import axios from 'axios'

const UserCountde = () => {
    const {id}=useParams()
    console.log(id)
    const [data,setData]=useState([])

    const getdata=async()=>{
      try{
        const result=await axios.get(`http://localhost:8080/user/${id}`)
        console.log("rsult=--------0000-",result.data.getusers)
        //result.data.status
        if(result.data.status){ 
          setData(result.data.user)
          console.log(data)
      }
    
     }catch(err){
 
      console.log({meassage:err.meassage})
  
     }
    }

    useEffect(()=>{
     getdata()
    },[])

    

  return (
    <>
    <Header/>
    <div className='usercount'>
        <h1>Details of Account No.{data?.account?.accountNumber}</h1>
        <span className='user-head'>
            User Details {data?.account?.accountNumber}
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

    </div>
    </>
  )
}

export default UserCountde