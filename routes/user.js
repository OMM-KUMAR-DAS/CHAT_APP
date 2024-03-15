const express=require("express")
const router=express.Router()


const{signup} = require("../controllers/Signup")

const{login_user} = require("../controllers/Login")


router.post("/signupp",signup)

router.post("/log",login_user)




module.exports=router;