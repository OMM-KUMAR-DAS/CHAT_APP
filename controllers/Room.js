const Room=require("../models/room")

exports.roomadd = async(req,res) => {
    
    try{

       //adding room name

        const {roomname} = req.body
        console.log(" ")
        console.log(roomname)


        const existingroom=await Room.findOne({roomName:roomname})
    


         if(existingroom)
         {
                console.log("hi")
                return res.json({
                    message:"room already exists",
                    success:"false"
                })
         }

         else{
          const roomad = await Room.create({roomName:roomname})
          
          console.log("hello")

          
          return res.status(202).json({
           message:roomad,
           success:"true"
           })
         }
 
    }
    catch(error){
         res.status(500).send(error.message)
    }

} 


exports.specificroom = async(req,res) => {

     try{

          const{roomname,username,message,time}=req.body;
          console.log(roomname)
           
          const ans= await Room.findOne({roomName:roomname})

           
          console.log(ans)

          
               ans.items.push({name:username,mes:message,Time:time})

               ans.save();

               return res.status(202).json({
                    success:"true",
                    result:ans.items
               })  
          
     }
     
     catch(error)
     {
          console.error('Error adding object:', error);

     }
}  

//for this portion i haven,t made any component in react

exports.allrooms= async(req,res)=>{
     try{
       
          const ro= req.query.ROOMNAME
          // const user=req.query.username
          
          const ans= await Room.findOne({roomName:ro})

          console.log(ans)
          
          if(ans)
          {

               console.log(ans.items[1].name)
               return res.status(200).json({

                    success:"True",
                    message:ans.items
               })
          }

          else{
               return res.status(200).json({
                    success:"false",
                    message:"this room doesnot exists"
               })
          }


     }catch(error)
     {
            return res.status(501).json({
               success:"False",
               message:error
            })
     }
}
