const express=require("express")
const authMiddleware = require("../middleware/auth.middleware")
const isAdmin=require("../middleware/auth.admin")
const router=express.Router()

router.get("/welcome",authMiddleware,isAdmin,(req,res)=>{
    const {userName}=req.userInfo
    res.status(200).json({
        Message: `Welcome ${userName} to admin page`
    })
})


module.exports=router