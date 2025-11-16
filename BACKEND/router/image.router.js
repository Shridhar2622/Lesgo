const express=require("express")
const router=express.Router()
const {uploadImage,fetchingImages,deleteImage}=require("../controllers/image.controller")
const authMiddleware = require("../middleware/auth.middleware")
const isAdmin=require("../middleware/auth.admin")

const uploadMiddleware=require("../middleware/upload.middleware")



//To upload Images
router.post("/uploadImage",authMiddleware,isAdmin,uploadMiddleware.single('image'),uploadImage)


//To view Images
router.get("/viewImages",authMiddleware,fetchingImages)


//To delte an image
router.delete("/deleteImage/:id",authMiddleware,isAdmin,deleteImage)

module.exports=router