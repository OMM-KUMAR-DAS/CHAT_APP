    const User= require('../models/user')


    exports.login_user= async (req,res)=>{
        try{

            const {email,password}= req.body

            
           console.log(password)
           
           
            const user= await User.find({email,password})
            console.log(user)
           
            if(!user || user=='')
            {
                return res.status(404).json({
                    success:false,
                    message:"User not registered or Wrong credentials"
                })
            }
            
            return res.status(201).json({
                success:true,
                data:user
            })


            

        }catch(err){
               res.status(501).json({
                success:false,
                messsage:err.message
               })
            }
}
    