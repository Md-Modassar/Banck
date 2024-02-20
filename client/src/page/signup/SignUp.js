import React, { useState } from 'react'
import './signup.css'
import { Link } from 'react-router-dom'
import {  useLocation, useNavigate } from 'react-router-dom'
import axios from "axios";

const SignUp = () => {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const ulr=toString(selectedFile)
  const handleUpload = () => {
    if (selectedFile) {
      // Perform the upload logic here, e.g., send the file to the server
      console.log('Selected File:', selectedFile);
    } else {
      console.error('No file selected');
    }
  };
  //const [auth,setAuth]=useAuth() 
  const [input,setInput]=useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    photo:"",
    accountType:"",
    balance:""
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
   const handleChange=(e)=>{
    setInput((preState)=>({
      ...preState,
      [e.target.name]:e.target.value
    }))
   }

   let status
  const heandelSubmit=async()=>{
    try{
      const result=await axios.post('http://localhost:8080/creatuser',{
        name:input.name,
        email:input.email,
        phone:input.phone,
        password:input.password,
        photo:ulr,
        account:{
          accountType:input.accountType,
          balance:input.balance
        }
      })
     
      status=result.data.status
      if(result){ 
       
       
        navigate(location.state||'/login')
       
    }
  
   }catch(err){
  
    status=err.response.data.status
  
   }
 }  

  return (
    <div className='signup'>
        <h1>SingUp</h1>
     <input name='name' type="text" value={input.name} placeholder='Enter Name' onChange={handleChange} />
     <input name="email" type='email' value={input.email} placeholder='Enter Email' onChange={handleChange} />
     <input name="phone" type='text' value={input.phone} placeholder='Enter Phone No' onChange={handleChange} />
     <input name="password" type='password' value={input.password} placeholder='Enter Password' onChange={handleChange} />
     <input  type="file" onChange={handleFileChange} />
     <button onClick={handleUpload}>Upload</button> 
     <h1>Account Details</h1>
     <input name='accountType' type='text' value={input.accountType} placeholder='Account Type' onChange={handleChange} />
     <input name="balance" type="text" value={input.balance} placeholder='Enter Balance' onChange={handleChange} />

     <div className='butn'>
      <Link to="/login"> <button>Login</button></Link> 
        <button onClick={heandelSubmit}>Submit</button>
     </div>
    </div>
  )
}

export default SignUp