//import React from 'react'
import React, { useState } from 'react'
import "./transction.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreditCard = () => {
    const [input,setInput]=useState({
        userId:"",
        AccountNo:"",
        description:"",
        amount:"",
        Transfer_AccountNo:"",
       });
       const navigate=useNavigate();
       const location =useLocation();
      //  const openPopUp = () => {
      //   setIsPopUp(true);
      // };
    
      // const closePopUp = () => {
      //   setIsPopUp(false);
      //   window.location.reload();
      // };

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
       object.userId=storedData.emailExist._id
        object.AccountNo=storedData.emailExist.account.AccountNo
      
       if (input.description) object.description = input.description;
       if (input.amount) object.amount = input.amount;
       if (input.Transfer_AccountNo) object.Transfer_AccountNo = input.Transfer_AccountNo;

    
       let status
      const heandelSubmit=async()=>{
        try{
          const result=await axios.post('http://localhost:8080/transaction',object)
          //console.log("rsult=--------0000-",result.data)
          status=result.data.status
          if(result){ 
            //openPopUp()
          //   setAuth({
          //     ...auth,
          //     user:result.data.emailExist,
          //     token:result.data.token
      
          //   })
           // localStorage.setItem("auth",JSON.stringify(result.data))
            navigate(location.state||'/transction')
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
      <div className='signup'>
          <h1>Credit Card Form</h1>
       <input name="description" type='text' value={input.description} placeholder='Enter description' onChange={handleChange} />
       <input name="amount" type='text' value={input.amount} placeholder='Enter amount' onChange={handleChange} />
       <>If You want to transfer money then enter Transfer AcccountNo</>
       <input name='Transfer_AccountNo' type='text' value={input.Transfer_AccountNo} placeholder='Enter Transfer_AccountNo' onChange={handleChange}/>
       <div className='butn'>
        <Link to="/login"> <button>Login</button></Link> 
          <button onClick={heandelSubmit}>Submit</button>
       </div>
      </div>
    )
}

export default CreditCard