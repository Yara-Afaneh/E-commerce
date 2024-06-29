import Joi from "joi";

export const generalFeilds={
    email:Joi.string().email().min(8).max(50).required(),
    password:Joi.string().min(8).max(20).required(),
    id:Joi.string().hex().length(24).required(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/png','image/jpeg','image/webp').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().max(500000).required(),
    }).required(),
}
const validation =(schema)=>{
    return (req,res,next)=>{
        const errorsMessage=[];
        let filtterData={};
        if(req.file){
            filtterData={image:req.file,...req.params,...req.body,...req.query}
        }else if(req.files){
            filtterData={...req.files,...req.params,...req.body,...req.query}
        }else{
            filtterData={...req.params,...req.body,...req.query}
        }
        const  {error}=schema.validate(filtterData,{abortEarly:false})
        if(error){
            error.details.forEach(err=>{
                const key=err.context.key;
                errorsMessage.push({[key]:err.message})
                
            });
            return res.status(400).json({message:'Validation error', errorsMessage: errorsMessage})
           
        }
     
       
        next();
    }
        
    
}

export default validation;