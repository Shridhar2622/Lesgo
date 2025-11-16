const {register,login,changePasword}=require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")

const express=require("express")
const router=express.Router();


//This is to register the user
router.post("/register",register)



//this is to login user
router.get("/login",login)


//this is to changePasword
router.put("/changePasword",authMiddleware,changePasword)

module.exports=router;



