    const User= require('../models/user')

    const jwt =require("jsonwebtoken")
    const bcrypt=require("bcrypt")
    require("dotenv").config()


    exports.login_user= async (req,res)=>{
        try{

        const{email,password}=req.body

        if(!email || !password)
        {
            return res.status(404).json({
                success:false,
                message:"enter the crediatials coorectly"
            })
        }

        const user = await User.findOne({email})

        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"user is not registered"
            })
        }
        
        //verify the password

        const payload={
             email:user.email,
             id:user._id,
             Gender:user.Gender
        }

        if(await bcrypt.compare(password,user.password))
        {
                let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h",})
                
                // cli=cli.toObject();
               
                const options ={
                    expires:new Date( Date.now() + 3*24*60*60*1000)
                }

                res.status(200).json({
                    success:true,
                    token,
                    user,
                    message:"user logged in succesfully",
                })
        }
        else{
            return res.status(403).json({
                success:false,
                message:"password incorect"
            }) 
        }



            

        }catch(err){
               res.status(501).json({
                success:false,
                messsage:"No internet connection"
               })
            }
}
    