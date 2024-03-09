import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {  useLocation, useNavigate } from 'react-router-dom'
import axios from "axios";
import {BASE_URL} from "../../server/server"

const Edit = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    
    const {id}=useParams()
    console.log(id)
    const [data,setData]=useState([])

    const getdata=async()=>{
      try{
        const result=await axios.get(`${BASE_URL}/user/${id}`)
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
     const object = {};

if (input.name) object.name = input.name;
if (input.email) object.email = input.email;
if (input.phone) object.phone = input.phone;
if (input.password) object.password = input.password;
if (ulr) object.photo = ulr;
if (input.accountType) object.accountType = input.accountType;
if (input.balance) object.balance = input.balance;
    const heandelSubmit=async()=>{
      try{
        const result=await axios.put(`${BASE_URL}/updateuser/${id}`,object)
       
        status=result.data.status
        if(result){ 
         
         
          navigate(location.state||`/account/${id}`)
         
      }
    
     }catch(err){
    
      status=err.response.data.status
    
     }
   }  
  return (
    <div className='signup'>
    <h1>Edit Account</h1>
    <input name='name' type="text" value={input.name} placeholder={data?.name} onChange={handleChange} />
    <input name="email" type='email' value={input.email} placeholder={data?.email} onChange={handleChange} />
    <input name="phone" type='text' value={input.phone} placeholder={data?.phone} onChange={handleChange} />
    <input  type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>Upload</button> 
    <h1>Account Details</h1>
    <input name='accountType' type='text' value={input.accountType} placeholder={data?.account?.accountType} onChange={handleChange} />
    <input name="balance" type="text" value={input.balance} placeholder={data?.account?.balance} onChange={handleChange} />

    <div className='butn'>
    <button onClick={heandelSubmit}>Submit</button>
 </div>
</div>
  )
}

export default Edit