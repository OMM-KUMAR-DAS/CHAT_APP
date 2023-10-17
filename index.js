const express = require('express');
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const moment= require('moment')
const cors= require('cors')
const app = express();
require('dotenv').config();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
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

  app.use('/api/v1',USER)



const io = new Server(server,{
    cors: {
        origin:"http://localhost:3000",
    }
});

const port=process.env.PORT || 7000

io.on('connection', (socket) => {

  socket.on('chat message', (data) => {

    const{username,cha,rome}= data
    
    console.log(rome)

    var time= moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    console.log(time)
    io.to(rome).emit('chat message',{username,cha,time})

  });


  socket.on('joinRoom', (rome) => {
    socket.join(rome); // Join the specified room
    console.log(`Socket joined room ${rome}`);
  });


  socket.on('leaveroom', (rome) => {
    socket.leave(rome); // Join the specified room
    console.log(`Socket left room ${rome}`);

  });




  socket.on('disconnectme',() =>{
      socket.disconnect()
       
  })

});

server.listen(port, () => {
  console.log('listening on *:'+ port);
});


