import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useDispatch} from 'react-redux';

import {add} from '../store/userSlice';

const Login = () => {
  
  const navigate = useNavigate();

  const[fort,setf]=useState({email:"",password:""})

  const dispatch= useDispatch();

  

  function handleuser(event)
  {
    setf((prev)=>(
      {
          ...prev,[event.target.name]:event.target.value
      }))
  }

  function check(event)
  {
    event.preventDefault()

    fetch("http://localhost:5000/api/v1/log",{
    
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                  
                  email:fort.email,
                  password:fort.password
                  
                })
    })
    
        .then(respons=>respons.json())
        .then(data=>{
                  
                    if(data.success)
                    {
                        toast.success(` ${data.name} join the metting`, {
                        position: toast.POSITION.TOP_CENTER
                      }); 
                        dispatch(add(data))
                        navigate('/chat')
                    }
                    
                    else{
                      toast.success(`${data.message}`, {
                        position: toast.POSITION.TOP_CENTER
                      });
                    }
        });
  }





  return (
    <div>
     
         <form onSubmit={check}>

                      <label>
                            <p>Email<sup>*</sup></p>
                            <input
                              required
                              type="text"
                              name="email"
                              value={fort.email}
                              onChange={handleuser}
                              
                              placeholder="enter email"/>
                      </label>

                      <label>
                            <p>Password<sup>*</sup></p>
                            <input
                              required
                              type="text"
                              name="password"
                              value={fort.password}
                              onChange={handleuser}
                              
                              placeholder="enter password"/>
                      </label>

                      <br></br>
                      <br></br>
                      <br></br>

                      <button>Log In</button>   
        </form>
      
    </div>
  )
}

export default Login