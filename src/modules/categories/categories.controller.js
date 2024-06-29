import categoriesModel from "../../../DB/models/categories.model.js";
import cloudinary from "../../ults/cloudinary.js";
import slugify from 'slugify';



export const create=async(req,res,next)=>{
 
    const name=req.body.name.toLowerCase();
    if(await categoriesModel.findOne({name})){
        return res.status(409).json({message:'category already exists'})
    }
    req.body.slug=slugify(req.body.name)
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APPNAME}/categories`
    })

    req.body.image={secure_url,public_id};
    req.body.createdBy=req.user._id;
    req.body.updatedBy=req.user._id;

    

    const category=await categoriesModel.create(req.body)
   
   return res.json({message: category});
}

export const getall=async(req,res,next)=>{
    const categories=await categoriesModel.find({}).populate([{
        path:'createdby',
        select:'userName',
    },
    {
        path:'updatedby',
        select:'userName',
    },{
        path:'subcategory'
    }
]);
    return res.status(200).json(categories);
}
export const getactive=async(req,res,next)=>{
    const categories=await categoriesModel.find({status:'active'}).select('name image');
    return res.status(200).json(categories);
}
export const getDetails=async(req,res,next)=>{
    const categoryDetails=await categoriesModel.findById(req.params.id);
    return res.status(200).json({message:'success',categoryDetails})
};

export const update=async(req,res,next)=>{
    
    const category=await categoriesModel.findById(req.params.id);
   
    if(!category){
        return res.status(404).json({message:'category not found'});
    }
  
    category.name=req.body.name.toLowerCase();

    if(await categoriesModel.findOne({name:req.body.name,_id:{$ne:req.params.id}})){
        return res.status(409).json({message:'name already exists'})
    }
    category.slug=slugify(req.body.name);
    if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
            folder:'Yarashop/categories'
        })
          cloudinary.uploader.destroy(category.image.public_id);
        category.image={secure_url,public_id}
  
    }

    category.status=req.body.status;
    category.updatedBy=req.user._id
    await category.save();

    return res.json({message:'Success',category})

   
};

export const destroy=async (req, res, next) => {
    const category=await categoriesModel.findByIdAndDelete(req.params.id);

    if(!category){
        return res.status(404).json({message:'No category found'})
    }

    await cloudinary.uploader.destroy(category.image.public_id);
    category.updatedBy=req.user._id
    return res.status(200).json({message:'success',category})
}
