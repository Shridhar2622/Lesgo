require("dotenv").config();
const express=require("express")
const router=require("./router/user.router")
const homeRouter=require("./router/home.router")
const adminRouter=require("./router/admin.router")
const imageRouter=require("./router/image.router")
const app=express();
const PORT= process.env.PORT || 3000
const connect=require("./database/db")
connect();
app.use(express.json())


//middleware
app.use("/user/api/",router)
app.use("/user/api/home",homeRouter)
app.use("/user/api/admin",adminRouter)
app.use("/user/api/image",imageRouter)


//this is where your sevrer is running
app.listen(PORT,()=>{
    console.log("Server is running",PORT);
    
})