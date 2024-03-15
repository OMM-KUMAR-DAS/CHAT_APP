const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        trim:true
    },

    password:{
        type:String,
        required:true
    },

    phone:{
        type:Number,
        required:true
       
    },
   
    Gender:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model("user",userSchema)

