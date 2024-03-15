const mongoose=require('mongoose')

const roomSchema=new mongoose.Schema({

    roomName:{
        type:String,
        trim:true
    },

    items:[
        {
            name:{
                type: String,
                required: true
            },

            mes: {
                type: String,
                required: true
            },

            Time:{
                type: String,
                required: true
            }
        }
    ]
})

module.exports=mongoose.model("room",roomSchema)
