const express=require("express")
const router=express.Router();
const authMiddleware=require("../middleware/auth.middleware")
const isUser=require("../middleware/auth.user")

router.get("/welcome",authMiddleware,isUser,(req,res)=>{
    const {userName}=req.userInfo
    res.json({
        message: `Welcome ${userName} to home-page`,
        
    })
})

module.exports=router