const mongoose=require("mongoose")
require("dotenv").config()

const connect=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoDB connected succesfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports=connect;