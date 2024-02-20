import React, { useEffect, useState } from 'react'
import "./users.css"
//import data from "../data/userdata"
import profile from "../../images/profile.png"
import Header from '../header/Header'
import { Link } from 'react-router-dom'
import axios from "axios"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const Users = () => {
    const [data,setData]=useState([])
    const getusers=async()=>{
        try{
            const result=await axios.get("http://localhost:8080/getalluser")
          //  console.log("rsult=--------0000-",result.data.getusers)
            //result.data.status
            if(result.data.status){ 
              setData(result.data.getusers)
              console.log(data)
          }
        
         }catch(err){
     
          console.log({meassage:err.meassage})
      
         }
    }

    useEffect(()=>{
       getusers()
    },[])
    

    const deleteuser=async(id,i)=>{
        try{
            console.log("id",id)
            const result=await axios.delete(`http://localhost:8080/userdelete/${id}`)
          //  console.log("rsult=--------0000-",result.data.getusers)
            //result.data.status
            if(result){ 
             data.splice(i,1)
              setData([...data])
             console.log(data)
          }
        
         }catch(err){
     
          console.log({meassage:err.meassage})
      
         }
        console.log("hi")
    }
  return (
    <>
    <Header/>
    <div className='user'>
        <h1>All User Account</h1>
        <div className='header-user'>
            <span>Ac_No.</span>
            <span>Name</span>
            <span>Photo</span>
            <span>Account Type</span>
            <span>Mobile</span>
            <span>Email</span>
            <span>Opening Date</span>
            <span>Action</span>
        </div>
         <div className='user-container'>
            {
             data?.map((product,i)=>(
                
                <div className='user-card' >
                    <span>{product?.account?.accountNumber}</span>
                    <span>{product?.name}</span>
                    <Link to={`/account/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src={product?.photo} style={{height:"60px",width:"60px" ,}} alt=''/>
                    </Link>
                    <span>{product?.account?.accountType}</span>
                    <span>{product?.phone}</span>
                    <span>{product?.email}</span>
                    <span>{product?.account?.openingdate}</span>
                    <span>                
                        <Link to={`/edit/${product._id}`}><ModeEditOutlineIcon style={{color:"blue",cursor:"pointer"}}  /></Link>
       
                        <DeleteForeverIcon style={{color:"red",cursor:"pointer"}} onClick={()=>deleteuser(product._id,i)}/>
                        
                    </span>
             
                </div>
                
               
             ))
            }
         </div>
        </div>
        </>
  )
}

export default Users