import React from 'react'
import "./forget.css"

const ForgetPassword = () => {
  return (
    <div className='signup'>
    <h1>Set Password</h1>
    <input type='email' placeholder='Enter Email'/>
    <input type='password' placeholder='Enter New Password'/>
 <div className='butn'>
    <button>Submit</button>
    
 </div>
 
 <a href='/' style={{textDecoration:"none",color:"black"}}>Home Page</a>
</div>
  )
}

export default ForgetPassword