import {v2 as cloudinary } from "cloudinary"


// Clouadinary Config 

cloudinary.config({
    cloud_name: "dwvr054ck",
    api_key:"947783331778247",
    api_secret:"jDmfzv1zch2dBiaHdfGqrD3iNnE"
})

const uploadOnCloudinary  = async (path)=>{
    try {
        if(!path) return;
        const response = await cloudinary.uploader.upload(path)
        response;
        
        
    } catch (error) {
console.log("File Not Uploaded" , error);
        
    }
}