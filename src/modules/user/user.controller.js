import userModel from "../../../DB/models/user.model.js"

export const getAll=async(req,res)=>{
    const users=await userModel.find({});
    return res.status(200).json({message:'success',users})
}

export const getUserData=async(req,res)=>{
    const user=await userModel.find(req.user._id)
 
    return res.status(200).json({message:'success',user})
}