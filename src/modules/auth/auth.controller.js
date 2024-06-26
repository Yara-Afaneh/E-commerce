import userModel from './../../../DB/models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { sendEmail } from '../../ults/email.js';
import { customAlphabet } from 'nanoid';
;

export const register=async(req,res)=>{
   const {userName,email,password} = req.body;
   const user=await userModel.findOne({email});
   if(user){
    return res.status(409).json({message:'User already registered'})
   }

   const hashPass= bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
   const newuser=await userModel.create({userName,email,password:hashPass});
   if(!newuser){
    return res.status(500).json({message:'error creating user'})
}
   const token=jwt.sign({email},process.env.confirmEmailsig,{expiresIn:60*1});
   const refreshToken=jwt.sign({email},process.env.confirmEmailsig,{expiresIn:60*60*24});
   const html=`<div>YaraShop</div>
                <h2>Welcome to YaraSHop ${userName} </h2>
                <a href='http://localhost:3000/auth/confirmEmail/${token}'>Confirm Email</a></br>
                <a href='http://localhost:3000/auth/confirmEmail/${refreshToken}'>Resend Email</a>`


                await sendEmail(email,'welcome message',html);
   return res.status(201).json({message:'success',newuser})

}

export const login=async(req,res)=>{
    const {email,password}=req.body;

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({message:'Invalid email'});
    }

    if(!user.confirmEmail){
        return res.status(400).json({message:'plz confirm your email'});
    }
    const compare =await bcrypt.compare(password,user.password);
     
    if (user.status === 'not_active'){
        return res.status(400).json({message:'your account is not active'});
    }
    if(!compare){
        return res.status(400).json({message:'Invalid password'});
    }

    const token=await jwt.sign({id:user._id,role:user._role},process.env.LOGINSIGN)
    return res.status(200).json({message:'Success',token});
}

export const sendCode=async(req,res)=>{
     const {email}=req.body;
     const code=customAlphabet('1234567890abcdef',4)();
     const user =await userModel.findOneAndUpdate({email},{sendCode:code},{new:true});

     if(!user){
        return res.status(404).json({message:'email not found'});
     }

     await sendEmail(email,`reset password`,`<h2>code is ${code}</h2>`)
     return res.status(200).json({message:'success'});
    
    }

export const forgetPassword= async(req, res) => {
    const {email,password,code} = req.body;
    const user= await userModel.findOne({email})
    if(!user){
        return res.status(404).json({message:'email not found'});
    }

    if(user.sendCode!=code){
        return res.status(404).json({message:'invalid code'});
    }
    user.password = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
    await user.save();
    return res.status(200).json({message:'success'});
}

// export const confirmEmail=async(req,res)=>{
//     const {token}=req.params;
//     const decoded=jwt.verify(token,process.env.confirmEmailsig);
//     const user=await userModel.updateOne({email:decoded.email},{confirmEmail:true},{new:true});
//     if (user.modifiedCount >0){
//         return res.status(201).redirect(process.env.FEURL)
//     }
   
// }