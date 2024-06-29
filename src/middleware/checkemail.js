import userModel from "../../DB/models/user.model.js";
import { Apperror } from "../ults/Apperror.js";

export const checkemail=async(req,res,next)=>{
    const {email} = req.body;
    const user=await userModel.findOne({email});
    if(user){
       return next(new Apperror('email already in use',409))
    }
    next();
}