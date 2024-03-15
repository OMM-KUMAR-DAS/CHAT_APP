const express=require("express")
const router=express.Router()



const{specificroom,roomadd,allrooms} = require("../controllers/Room")

router.post("/room",specificroom)

router.post("/room1",roomadd)

router.get("/room2",allrooms)

module.exports=router;