import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Typography,Grid,TextField,Button,Box} from '@mui/material';


import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';






const Sign = () => {
  
  const navigate = useNavigate();
  const[fort,setf]=useState({name:"",email:"",password:"",phone:"",gender:""})
  
  const [showPassword, setShowPassword] = useState(false);
  
  
  
 
  
  function handleuser(event)
  {
    setf((prev)=>(
      {
          ...prev,[event.target.name]:event.target.value
      }))
   
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function check(event)
  {
    event.preventDefault()

    const passwordlength=6;
    const phonelength=10;

    const regex = new RegExp(`^.{${passwordlength},}$`);
    const regex1=new RegExp(`^.{${phonelength},}$`);

    if(regex.test(fort.password) && regex1.test(fort.phone))
      {
            
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
                          // sets(prev=>!prev);
                          navigate('/Login')
                      }
                      else{
                        toast.success(`{data.message}`, {
                          position: toast.POSITION.TOP_CENTER
                        });
                      }
            
            });
      
      }
      else if(!regex.test(fort.password))
      {
            toast.error("Password length is less than 6", {
              position: toast.POSITION.TOP_CENTER
            });
      }
      else{
            toast.error("Phone number is short", {
              position: toast.POSITION.TOP_CENTER
            });
      }
     
      
  }

return(
    <div>
       
        <form onSubmit={check}>

        <Typography varient="h7" color="primary" align="center" gutterBottom >Sign Up</Typography>

        <Box sx={{display:'flex',width:'50%',marginLeft:'auto',marginRight:'auto',boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.5)',padding:'20px',marginTop:'40px',borderRadius:'10%'}}>
        


        <Grid container spacing={1}>
              

              <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    
                    InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                    type="String"
                    label="Username"
                    name="name"
                    value={fort.name}
                    onChange={handleuser}
                    placeholder='Enter your name'
                    variant="outlined"
                  />
                </Grid>

              <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                    type="email"
                    label="Email"
                    name="email"
                    value={fort.email}
                    onChange={handleuser}
                    placeholder='Enter email'
                    variant="outlined"
                  />
                </Grid>
                

                  <Grid item xs={12}  >




                  <TextField
                      id="outlined-password-input"
                      label="Password"
                      required
                      fullWidth
                      InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={fort.password}
                      onChange={handleuser}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
      />
                 
                </Grid>
                
                 
                  

                 <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                    type="number"
                    label="Phone"
                    name="phone"
                    value={fort.phone}
                    onChange={handleuser}
                    placeholder='Enter phone number'
                    variant="outlined"
                  />
                </Grid>


                


                  <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                    type="String"
                    label="Gender"
                    name="gender"
                    value={fort.gender}
                    onChange={handleuser}
                    placeholder='Enter gender'
                    variant="outlined"
                  />
                </Grid>





                 


                
                  
                  <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                          Submit
                        </Button>
                  </Grid>
                

                 
                  <Grid item xs={12}>
                       <Link to='/Login'><p>Already an user</p></Link>
                  </Grid> 
          </Grid>  
          </Box>       
        </form>

    </div>
  )
                    }


export default Sign;