import React, { useState } from 'react'
import logo from '../images/logo.jpg'
import shadow from '../images/Shadow.jpg'
import label from '../images/Label.jpg'
import './signup.css'
import { useNavigate } from 'react-router-dom'


const Signup = () => {
  const [firstName,setfirstName] = useState()
  const [username,setusername] = useState()
  const [password,setpassword] = useState()
  
  
    let navigate = useNavigate()
   async function Sign(){
    
      
    const response = await fetch('http://localhost:5000/api/auth/createuser',{
           method:"POST",
           headers:{
            
               "accept":"application/json",
               "Content-Type":"application/json",
               
               
               
               },
         body:JSON.stringify({name:firstName,email:username,password:password}) 
          
       })
       const json = await response.json();
       console.log(json)
       if(json.success){
        JSON.stringify(localStorage.setItem('token',json.accessToken)) 
      navigate('/')
     }
     else{
       navigate('/signup')
         console.log('please enter correct email and password')
         alert('please enter correct email and password')
     }

    }
  return (
    <div>
        <img className='sLogo' src={logo} alt="" />
        <div className='sDiv'>
            <img className='ss' src={shadow} alt="" />
            <img className='sLable' src={label} alt="" />
            <input onChange={(e)=>setfirstName(e.target.value)} className='fName' placeholder='First Name' type="text" />
            <hr className='fHr' />
            <input className='lName' placeholder='Last Name' type="text" />
            <hr className='lHr' />
            <input onChange={(e)=>setusername(e.target.value)} className='pNum' placeholder='email' type="email" />
            <hr className='pHr' />
            <input onChange={(e)=>setpassword(e.target.value)} className='sEmail' placeholder='password' type="text" />
            <hr className='eHr' />
            <input className='sJob' placeholder='Project' type="text" />
            <hr className='jHr' />
            <input className='sCom' placeholder='Roles' type="text" />
            <hr className='cHr' />
            <input className='sComment' placeholder='Comment' type="text" />
            <hr className='comHr' />
            <button onClick={()=>navigate('/')} className='sCancel'>Cancel</button>
            <button onClick={Sign} className='sca'>Create Account</button>


        </div>
    </div>

  )
}

export default Signup