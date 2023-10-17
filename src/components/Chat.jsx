import React, { useState } from 'react'
import  io  from "socket.io-client";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useSelector } from 'react-redux';



const socket = io('http://localhost:5000',{
  reconnection: true,    // Enable reconnection
  reconnectionDelay: 1000, // Initial delay in milliseconds
  reconnectionDelayMax: 4000, // Maximum delay
  reconnectionAttempts: 1 // Number of reconnection attempts (Infinity means unlimited)
});

const Chat = () => {

  const[cha,setc]= useState('')
  const[mes,setm]= useState([''])
  const[bol,setb]= useState(false)
  const[rom,setro]= useState(true)
  const[rome,setr]= useState('')
  const content= useSelector((state)=>state.userinformation)
  const username= content[0].data[0].name
  

  

  async function chatting(event)

  { 
     
     event.preventDefault();
     await socket.emit("chat message", {username,cha,rome})
     
  }
    
    socket.on("chat message", (data) => {

                  console.log(data)
                  
                  setb(true)
                setm([
                  ...mes,
                  data
                ]);
   });


  function living_room(){

        socket.emit("leaveroom",rome)
        toast.error(`${username} left room ${rome}`)
        setr('')
        setro(prev=>!prev)

   }


 


   function go(event)
    {
        event.preventDefault()
        
            setro(prev=>!prev)
            socket.emit('joinRoom', rome);
              
    }


  


  

  return (



    <>  
    { rom ? <div>
            <form onSubmit={go}>
               <label>
                            
                            <input
                              required
                              type="text"
                              value={rome}
                              onChange={(e)=>setr(e.target.value)}
                              // className="in"
                              placeholder="enter room id"/>
                </label>
                <br></br>
                <button>Enter the chat Room</button> 

            </form>    

    </div>: 
                                <div>
                                      <h2>Welcome to the Chat Room</h2>
                                      <button className='' onClick={living_room}>Leave</button>  
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
                                        bol&&
                                            
                                              <div className='scrollable-container'>

                                               


                                                
                                                  {mes.map((message,index) => (

                                                        <>  
                                                        {message.username===username?
                                                                      <div key={index} className='me'>
                                                                            
                                                                      <div className='user'>
                                                                        <h4>~{message.username}</h4>

                                                                        <p><i>{message.time}</i></p>

                                                                      </div> 

                                                                      <div className='chats'>
                                                                        {message.cha}
                                                                      </div>
                                                              
                                                                    </div>:
                                                                    
                                                                    <div key={index} className='mee'>
                                                              
                                                                    <div className='user'>
                                                                      <h4>~{message.username}</h4>
      
                                                                      <p><i>{message.time}</i></p>
      
                                                                    </div> 
      
                                                                    <div className='chats'>
                                                                      {message.cha}
                                                                    </div>
                                                            
                                                                  </div>}
                                                           
                                                            
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




