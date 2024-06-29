import userModel from "../../DB/models/user.model.js";
import  jwt  from 'jsonwebtoken';
import { Apperror } from "../ults/Apperror.js";

export const roles={
    Admin:'admin',
    User:'user',
}

export const auth=(accessrole=[])=>{

    return async(req, res, next)=>{
        
        const {authorization} = req.headers;

       
        if(!authorization?.startsWith(process.env.BEARERTOKEN)){
        
            return next(new Apperror('Invalid token',401))
        }
        const token=authorization.split(process.env.BEARERTOKEN)[1];     
        const decodedToken=jwt.verify(token,process.env.LOGINSIGN);
        if(!decodedToken){
            return next(new Apperror('Invalid token',401))
        }
        const user=await userModel.findById(decodedToken.id).select('userName role');
       
        if(!user){
            return next(new Apperror('user not found',409))
        }

        if(!accessrole.includes(user.role)){
            return next(new Apperror('user not auth ',403))
        }

      req.user=user;
      

        next();

    }
}