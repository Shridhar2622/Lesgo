const image=require("../models/image")
const cloudinary=require("../CONFIG/cloudinary")
const {uploadToCloudinary}=require("../helpers/cloudinaryHelper")
const fs=require("fs")

const uploadImage=async (req,res)=>{

    try {
        //check if file is missing in req
        if(!req.file){
            return res.status(400).json({
            message: "File is required"
        })
        }

        //this is to upload on cloudinary
        const {url,publicId} =await uploadToCloudinary(req.file.path)

        //now to store in DataBase
        await image.create({
            url,
            publicId,
            uploadedBy : req.userInfo.userId
        })
            return res.status(201).json({
            message: "Image uploaded successfully"
        })
        fs.unlinkSync(req.file.path) 
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}


//to fetch images
const fetchingImages=async (req,res)=>{
    try {
        const images=await image.find({})
        if(images)
        {
            res.status(200).json({
                success: true,
                data: images
            })
        }
        
    } catch (error) {
        console.log(error)
         return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

//to delete image from db and cloudinary
const deleteImage=async (req,res)=>{
    try {
        const getCurrentImageId =req.params.id
        const currentUserId=req.userInfo.userId


        // const user=await User.findById(currentUserId)
        const Image=await image.findById(getCurrentImageId)


        //check if image exist or not
        if(!Image)
        {
            return res.status(404).json({
                success: false,
                message: "Image is not found"
            })
        }
        //check if it is deleted by the  uploaded admin or not
        if(Image.uploadedBy.toString() !==  currentUserId)
        {
            return res.status(403).json({
                success : false,
                message :"You are not authorized to delete this image"
            })
        }

        //delete this image first from your cloudinary 
        await cloudinary.uploader.destroy(Image.publicId)


        //now delete this image from MongoDB
        await image.findByIdAndDelete(getCurrentImageId)


        res.status(200).json({
            sucess: true,
            message : "Image deleted SucessFully"
        })

    } catch (error) {
        console.log(error)
         return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

module.exports={uploadImage,fetchingImages,deleteImage}