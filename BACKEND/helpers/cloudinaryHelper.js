const cloudinary=require("../CONFIG/cloudinary")
const uploadToCloudinary=async(filePath)=>{
    try {
        const result=await cloudinary.uploader.upload(filePath);
        return{
            url: result.secure_url,
            publicId:result.public_id
        }
        
    } catch (error) {
        console.error("Err while uploading image",err)
        throw new Error('error while uploading on cloudinary')
    }
}

module.exports={uploadToCloudinary}