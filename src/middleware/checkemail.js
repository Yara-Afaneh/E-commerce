import userModel from "../../DB/models/user.model.js";

export const checkemail=async(req,res,next)=>{
    const {email} = req.body;
    const user=await userModel.findOne({email});
    if(user){
     return res.status(409).json({message:'User already registered'})
    }
    next();
}