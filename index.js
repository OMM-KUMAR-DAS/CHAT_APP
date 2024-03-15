const express = require('express');
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const moment= require('moment')
const cors= require('cors')
const app = express();
require('dotenv').config();
//
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
//
app.use(bodyParser.json())
app.use(cors())




//connecting to the database


mongoose.connect("mongodb+srv://ommdas310:J6w3mHGfVSl8zr1p@cluster0.orf3t12.mongodb.net/Chat?retryWrites=true&w=majority")
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });



  const USER= require('./routes/user')
  const ROOM=require('./routes/room')

  app.use('/api/v1',USER)
  app.use('/api/v2',ROOM)



const io = new Server(server,{
    cors: {
        origin:"http://localhost:3000",
    }
});

const port=process.env.PORT || 7000

const maximum=2;

io.on('connection', (socket) => {

  socket.on('chat message', (data) => {

    const{user,cha,rome}= data
    
    var time= moment().format("dddd, MMMM Do YYYY, h:mm a")
    
    io.to(rome).emit('chat message',{user,cha,time})

  });


  socket.on('joinRoom', (rome) => {
    // Join the specified room

    const clients=io.sockets.adapter.rooms.get(rome);//function for getting the no of users in a perticular room

    if(!clients || clients.size <maximum )
    {
      
      socket.join(rome);
      
      socket.emit('roomjoined',"true")
    }
    else{
     
      console.log("hello")
      socket.emit('roomjoined',"false")
    }
  });


  socket.on('leaveroom', (rome) => {
    socket.leave(rome); // leave the specified room
  });

});

server.listen(port, () => {
  console.log('listening on-->'+ port);
});


