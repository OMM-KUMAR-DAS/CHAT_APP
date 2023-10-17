import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sign = () => {

  const navigate = useNavigate();
  const[fort,setf]=useState({name:"",email:"",password:"",phone:"",gender:""})
 
 


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
    fetch("http://localhost:5000/api/v1/signupp",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
               name:fort.name,
               email:fort.email,
               password:fort.password,
               phone:fort.phone,
               Gender:fort.gender
            })
        })
        .then(respons=>respons.json())
        .then(data=>{
          
                  if(data.success)
                  {
                      toast.success("user created", {
                      position: toast.POSITION.TOP_CENTER
                    });
                    
                      navigate('/Login')
                  }
                  else{
                    toast.success("user already existed", {
                      position: toast.POSITION.TOP_CENTER
                    });
                  }
        
        });
  }


  return (
    <div>
       
        <form onSubmit={check}>

                 <label>
                        <p>Name<sup>*</sup></p>
                        <input
                          required
                          type="text"
                          name="name"
                          value={fort.name}
                          onChange={handleuser}
                          // className="in"
                          placeholder="enter name"/>
                 </label>

                 <label>
                        <p>Email<sup>*</sup></p>
                        <input
                          required
                          type="text"
                          name="email"
                          value={fort.email}
                          onChange={handleuser}
                          // className="in"
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
                          // className="in"
                          placeholder="enter password"/>
                 </label>


                 <label>
                        <p>Phone<sup>*</sup></p>
                        <input
                          required
                          type="Number"
                          name="phone"
                          value={fort.phone}
                          onChange={handleuser}
                          // className="in"
                          placeholder="enter phone number"/>
                 </label>


                 <label>
                        <p>Gender<sup>*</sup></p>
                        <input
                          required
                          type="String"
                          name="gender"
                          value={fort.gender}
                          onChange={handleuser}
                          // className="in"
                          placeholder="enter gender"/>
                 </label>


                

                 <br></br>
                 <br></br>
                 <br></br>

                 <button>submit</button>

                 <Link to='/Login'><p>Already an user</p></Link>
        </form>

    </div>
  )
}

export default Sign;