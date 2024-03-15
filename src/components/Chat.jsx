import React, { useState } from 'react'
import  io  from "socket.io-client";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useSelector } from 'react-redux';
import { Typography,Box,Grid,TextField,Paper,Button} from '@mui/material';
import moment from 'moment';




const socket = io('http://localhost:5000')

const Chat = () => {

  const[cha,setc]= useState('')
  const[mes,setm]= useState([''])
  const[bol,setb]= useState(false)
  const[rom,setro]= useState(true)
  const[rome,setr]= useState('')
  const content= useSelector((state)=>state.userinformation)
  const user= content[0]


  

  async function chatting(event)

  { 
     
     event.preventDefault()
     
     await socket.emit("chat message", {user,cha,rome})
     var tim= moment().format("dddd, MMMM Do YYYY, h:mm a")
   

     fetch("http://localhost:5000/api/v2/room",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                  roomname:rome,
                  username:user,
                  message:cha,
                  time:tim
                })
            })

  }
    
  socket.on("chat message", (data) => {
                  setb(true)
                setm([
                  ...mes,
                  data
                ]);
               
   });



 


  function living_room(){

        socket.emit("leaveroom",rome)
        toast.error(`${user} left room ${rome}`)
        setr('')
        setro(prev=>!prev)
        setm([''])

   }

   function go(event)
    {
        event.preventDefault()

        const minlength=6;

        const regex = new RegExp(`^.{${minlength},}$`);

        if (regex.test(rome)) 
        { 
               socket.emit('joinRoom', rome);

               socket.on('roomjoined',(data)=>{
                                  console.log(data)
                                  if(data==='true')
                                  {
                                                      fetch("http://localhost:5000/api/v2/room1",{
                                                        method:'POST',
                                                        headers:{
                                                            "Content-Type":"application/json"
                                                        },
                                            
                                                        body:JSON.stringify({
                                                          roomname:rome,
                                                        })
                                                      })     
                                            
                                                      setro(prev=>!prev)
                                                      toast.success(` ${user} join the metting`, {
                                                                  position: toast.POSITION.TOP_CENTER
                                                      }); 
                                                      socket.off('roomjoined') 
                                  }     
                                  
                                  else{
                                    toast.error(` Maximum limit of 2`, {
                                      position: toast.POSITION.TOP_CENTER
                                          });
                                    socket.off('roomjoined')      
                                  }
               })
             
        
      }

      else{
        toast.error(`Room id length should be atlest 6`, {
          position: toast.POSITION.TOP_CENTER
             }); 
      }
             
    }
  return (

    <> 

    { rom ? 

                      
                      <form onSubmit={go} >
                      
                        <Typography varient="h7" color="primary" align="center" fontWeight={'bold'}  >Create your Chat Room</Typography>
                       
                      <Box sx={{width:'50%',marginLeft:'auto',marginRight:'auto',boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.5)',padding:'10px',marginTop:'40px',borderRadius:'20px'}}>


                      <Grid spacing={1}>  
                        <Grid item xs={12} sm={6} >
                            <TextField
                              required
                              fullWidth
                              sx={{ marginBottom: '20px',marginTop:'20px' }}
                              InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                              type="text"
                              label="Room name"
                              value={rome}
                              onChange={(e)=>setr(e.target.value)}
                              placeholder='enter room id'
                              variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                             
                                <button className='rom_button'>Enter</button>

                        </Grid>

              
                      </Grid> 

                        
                     
                         
                          </Box>


                      </form>    

            : 
                                <div>
                                      <h2>Welcome to the Chat Room</h2>
                                  
                                      <Button variant="contained" onClick={living_room} >Leave</Button>
                                      <form onSubmit={chatting}>
                                             
                                                      <label>    
                                                          <input
                                                            required
                                                            type="text"
                                                            onChange={(e) => setc(e.target.value)}
                                                            className="in"
                                                            placeholder="enter text"/>

                                                    </label>

                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>

                                                    <button className='bt'>Send</button> 
                                                   
                                      </form>
                                      
                                      {
                                        bol &&
                                            
                                              <div className='scrollable-container'>

                                              


                                                
                                                  {mes.map((message,index) => (

                                                        <>  
                                                        {message.user===user?
                                                                      //Yourself

                                                                     
                                                                      <Paper style={{width:'50%',background:'transparent',boxShadow:'none'}}>     
                                                                             

                                                                             <Typography varient="h7" align='left' color='darkred' fontWeight={'bold'}>~{message.user}</Typography>
      

                                                                              <Paper style={{ padding: '5px', margin: '5px',background:'rgb(255, 239, 227)',boxShadow:'none',borderRadius:'20px',textAlign:'left',fontWeight:'bold'}}>
                                                                                    {message.cha}
                                                                              </Paper>

                                                                              <Typography varient="h7" align='right' color='red' fontWeight={'bold'}>~{message.time}</Typography>
                    
                                                              
                                                                      </Paper>:

                                                                    //other user right side
                                                                    
                                                                   
                                                                  
                                                                  <Paper style={{width:'50%',background:'transparent',boxShadow:'none',marginLeft:'auto'}}>
                                                                           

                                                                            <Typography varient="h7" align='left' color='darkred' fontWeight={'bold'}>~{message.user}</Typography>
                       
              
                                                                    
                                                                            <Paper style={{ padding: '5px', margin: '5px',background:'rgb(255, 239, 227)',boxShadow:'none',borderRadius:'20px',textAlign:'left',fontWeight:'bold'}}>
                                                                                    {message.cha}
                                                                            </Paper>

                                                                              <Typography varient="h7" align='right' color='red' fontWeight={'bold'}>~{message.time}</Typography>
                                                                             
                                                                  </Paper>}
                                                           
                                                            
                                                        </>
                                                      
                                                  ))}
                                                 
                                                
                                               </div>  
                                              
                                      
                                    }

           
                                </div> 
                                
                                
                                }                       
    </>
    
  )
}


export default Chat




