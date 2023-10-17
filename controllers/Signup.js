


const User=require("../models/user")

exports.signup = async(req,res) => {
    
        try{

           //get data

            const {name,email,password,phone,Gender} = req.body

            const existinguser = await User.findOne({email})

            if(existinguser)
            
            {
                return res.status(404).json({
                     success:false,
                     message:"user already exists"})
            }


           
            const adduser = await User.create({name,email,password,phone,Gender})
        
            res.status(201).json({
                success:true,
                message:adduser
            })
        }
        catch(error){
             res.status(500).send(error.message)
        } 
}  
