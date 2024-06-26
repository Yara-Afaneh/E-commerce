import userModel from "../../DB/models/user.model.js";
import  jwt  from 'jsonwebtoken';

export const roles={
    Admin:'admin',
    User:'user',
}

export const auth=(accessrole=[])=>{

    return async(req, res, next)=>{
        
        const {authorization} = req.headers;

       
        if(!authorization?.startsWith(process.env.BEARERTOKEN)){
            return res.status(400).json({message:'Invalid token'})
        }
        const token=authorization.split(process.env.BEARERTOKEN)[1];     
        const decodedToken=jwt.verify(token,process.env.LOGINSIGN);
        if(!decodedToken){
            return res.status(400).json({message:'Invalid token'})
        }
        const user=await userModel.findById(decodedToken.id).select('userName role');
       
        if(!user){
            return res.status(400).json({message:'user not found'})
        }

        if(!accessrole.includes(user.role)){
            return res.status(403).json({message:'user not auth'})
        }

      req.user=user;
      

        next();

    }
}