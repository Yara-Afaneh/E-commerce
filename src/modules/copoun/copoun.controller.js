
import copounModel from './../../../DB/models/copoun.model.js';

export const create =async(req,res)=>{

    if(await copounModel.findOne({name:req.body.name})){
        return res.status(404).json({message:'copoun already exists'});
    }
    req.body.expiredDate=new Date(req.body.expiredDate);
    const copoun = await copounModel.create(req.body);
    return res.status(200).json({message:'success',copoun});
 
}