const User=require("../models/user")
const bcrypt=require("bcrypt")
// import EmailValidator from "../../my-app/src/components/EmailValidator"

exports.signup = async(req,res) => {
    
        try{

           //get data

            const {name,email,password,phone,Gender} = req.body

            const existinguser = await User.findOne({email})

            // if(!EmailValidator(email))
            // {
            //       return res.status(400).json({
            //         success:false,
            //         message:"Wrong Email Format"
            //       })
            // }

            if(existinguser)
            
            {
                return res.status(404).json({
                     success:false,
                     message:"user already exists"})
            }




             //secure password

             let hashedPassword

             try{
                 hashedPassword = await bcrypt.hash(password,10)
             }
             catch(err){
                 return res.status(500).json({
                     success:failure,
                     message:"error in hashing password"
                 })
             }


            const adduser = await User.create({name,email,password:hashedPassword,phone,Gender})
        
            res.status(201).json({
                success:true,
                message:adduser
            })
        }
        catch(error){
             res.status(500).send(error.message)
        } 
}  
