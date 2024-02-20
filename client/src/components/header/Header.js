import React from 'react'
import "./header.css"
import { Link } from 'react-scroll'
import { NavLink } from 'react-router-dom'
import Person2Icon from '@mui/icons-material/Person2';
import { useAuth } from '../../context/auth';

const Header = () => {
  const [auth]=useAuth()
  const storedDataString = localStorage.getItem("auth");

  // Parse the JSON string into an object
  const storedData = JSON.parse(storedDataString);
  
  // Access the _id property from the parsed object
  const name= storedData.emailExist.name;
  const id=storedData.emailExist._id
  
  console.log(auth)
  return (
    <div className='header'>
      <div className='logo'>
       <NavLink to="/" style={{textDecoration:"none"}}> <h1>IndusInd Bank</h1></NavLink>
      </div>
      <div className='header-right'>
      <div className='header-option'>
        <a href={`/account/${id}`} style={{textDecoration:"none"}} className='profile'><Person2Icon/>{name}
         
        </a>
        <Link spy={true} to="service" smooth={true}><a >Services</a></Link>
        <a href='/users' style={{textDecoration:"none",}}>Users</a>
        <a href='/transction' style={{textDecoration:"none"}}>Transction</a>
        <a href='/createtransaction'>CreateTransction</a>
        <Link spy={true} to="about" smooth={true}><a>About</a></Link>
        <a href='/creditcard' style={{textDecoration:"none",}}>Credit Card</a>
      </div>
       <div className='login-signup'>
        <a href='/login' style={{textDecoration:"none",color:"white"}}>Login</a>
        <a href='/signup' style={{textDecoration:"none",color:"white"}}>SignUp</a>
       </div>
       
      </div>
    </div>
  )
}

export default Header