import React, { useState } from 'react'
import "./login.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/auth'

const Login = () => {
  //const [isPopUp,setIsPopUp]=useState(false)
  const [auth,setAuth]=useAuth() 
  const [input,setInput]=useState({
    email:"",
    password:""
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
      const result=await axios.post('http://localhost:8080/login',{
        email:input.email,
        password:input.password
      })
      //console.log("rsult=--------0000-",result.data)
      status=result.data.status
      if(result.data.status){ 
        //openPopUp()
        setAuth({
          ...auth,
          user:result.data.emailExist,
          token:result.data.token
  
        })
        localStorage.setItem("auth",JSON.stringify(result.data))
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
    <div className='signup'>
    <h1>LogIn</h1>
    <input name="email" type='email' value={input.email} onChange={handleChange} placeholder='Enter Email'/>
    <input name="password" type='password' value={input.password} onChange={handleChange} placeholder='Enter Password'/>
  <div className='butn'>
    <Link  to="/signup"><button>SignUp</button></Link>
    <button onClick={heandelSubmit}>Login</button>
    
 </div>
 <a href='/forget'>Forget Password</a>
 <a href='/' style={{textDecoration:"none",color:"black"}}>Home Page</a>
</div>
  )
}

export default Login