const mongoose=require("mongoose")
require("dotenv").config()

const userSchema=new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    pasword:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['user','admin'], //only allow user or admin roles
        default: "user"
    }

},{timestamps: true})


module.exports=mongoose.model('User',userSchema)