
import React, { useState } from 'react'
import "./newcreditcard.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from "../../server/server"
const NewCreditCard = () => {
    const [input,setInput]=useState({
        userId:"",
        AccountNo:"",
       
       });
       
       const navigate=useNavigate();
       const location =useLocation();
    

      const storedDataString = localStorage.getItem("auth");

      // Parse the JSON string into an object
      const storedData = JSON.parse(storedDataString);
      
      // Access the _id property from the parsed object
      const id = storedData.emailExist._id;
       console.log("===",storedData.emailExist)
       console.log(id)
       const handleChange=(e)=>{
        setInput((preState)=>({
          ...preState,
          [e.target.name]:e.target.value
        }))
       }

       const object={};
       object.userId=id
       object.accountNumber= storedData.emailExist.account.accountNumber
      
     

    
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

        <div className='credit-from'>
      <div className='signup'>
          <h1>Credit Card Form</h1>
       <input name="userId" type='text' value={input.userId} placeholder='Enter userId' onChange={handleChange} />
       <input name="AccountNo" type='text' value={input.AccountNo} placeholder='Enter AccountNo' onChange={handleChange} />
       <div className='butn'>
          <button onClick={heandelSubmit}>Submit</button>
       </div>
      </div>
      </div>
    )
}

export default NewCreditCard