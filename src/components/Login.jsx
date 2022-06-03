import logo from '../images/llogo.jpg'
import pmc from '../images/pmc.jpg'
import layer from '../images/layer.jpg'
import arrow from '../images/arrow.jpg'
import { useNavigate } from 'react-router-dom'
import './login.css'
import { useState } from 'react'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    let navigate = useNavigate();
      
 async function Frontpage(){

    
    const response =  await fetch('http://localhost:5000/api/auth/login',{
           method:"POST",
           headers:{
               "accept":"application/json",
               "Content-Type":"application/json"
           },
         body:JSON.stringify({email: email, password:password})
         

         
          
       });
       const json = await response.json();
       if(json.success){
          JSON.stringify(localStorage.setItem('token',json.accessToken)) 
        navigate('/dashboard')
       }
       else{
         navigate('/')
           console.log('please enter correct email and password')
           alert('please enter correct email and password')
       }
      
       
      
   }
   function Signup(){
       navigate('/signup')
   }
   
    
  
  return (
    <div className='loginBody'>
    <div>
        <img className='lLogo' srcSet={logo} alt="" />
        <img className='line' srcSet={pmc} alt="" />
        <img className='layer' srcSet={layer} alt="" />
    </div>
    <div className='loginBox'>
        <p className='loginP'>Login</p>
        <p className='loginEmail'>Email</p>
        <input onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' className='loginInput' type="text" />
        <img className='nameA' src={arrow} alt="" />
        <p className='loginPass'>Password</p>
        <input onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' className='lip' type="text" name="" id="" />
        <img className='passA' src={arrow} alt="" />
        <button onClick={Signup} className='btnSu'>Sign Up</button>
        <button onClick={Frontpage} className='btnL'>Login</button>

    </div>
    </div>
  )
}

export default Login