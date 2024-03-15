import React from 'react'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {useDispatch,useSelector} from 'react-redux';

import {add} from '../store/userSlice';

import {gett} from '../store/protectedSlice'

import { Link } from 'react-router-dom';

import {Typography,Grid,TextField,Button,Box} from '@mui/material';


import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';







const Login = () => {

  
  
  const navigate = useNavigate();

  const[fort,setf]=useState({email:"",password:""})

  const dispatch= useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  
  const hh= useSelector((state)=>state.protected)

  console.log(hh.logged)
  

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
                     
                        dispatch(add(data.user.name))
                        dispatch(gett("true"))
                       
                        navigate('/chat')
                    }
                    
                    else{
                      toast.success(`${data.message}`, {
                        position: toast.POSITION.TOP_CENTER
                      });
                    }
        });
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };





  return (
    
     
         <form onSubmit={check}>
             
             <Typography varient="h7" color="primary" align="center" gutterBottom >LOGIN</Typography>
             <Box sx={{display:'flex',justifyContent:'center',alignContent:'center',width:'50%',marginLeft:'auto',marginRight:'auto',boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.5)',padding:'10px',marginTop:'40px',borderRadius:'10%'}}>
        
                <Grid spacing={3}>
                  <Grid item xs={12} sm={6} >
                            <TextField
                              required
                              fullWidth
                              sx={{ marginBottom: '20px',marginTop:'20px' }}
                              InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                              type="email"
                              label="Email"
                              name="email"
                              value={fort.email}
                              onChange={handleuser}
                              placeholder='Enter your email'
                              variant="outlined"
                            />
                   </Grid>

                     



                  <Grid item xs={12} >
                  <TextField
                      id="outlined-password-input"
                      label="Password"
                      required
                      fullWidth
                      sx={{ marginBottom: '20px' }}
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

                      

                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
                
                       
                      <br></br> 

                <Grid item xs={12}>
                    <Link to='/Sign'><p>New User</p></Link>
                </Grid> 
            </Grid>

         </Box>       
                     
                     
        </form>
      
    // </div>
  )
}

export default Login