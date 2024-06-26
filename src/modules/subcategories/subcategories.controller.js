import categoriesModel from "../../../DB/models/categories.model.js";
import subcategoriesModel from "../../../DB/models/subcategories.js";
import cloudinary from "../../ults/cloudinary.js";
import slugify from 'slugify';




export const create=async(req,res)=>{

    const {categoryId}=req.body;
    const category=await categoriesModel.findById(categoryId);

    if(!category){
        return res.status(404).json({message: 'No categoryfound'})
    }
 
    const name=req.body.name.toLowerCase();
    if(await subcategoriesModel.findOne({name})){
        return res.status(409).json({message:'subcategory already exists'})
    }
    req.body.slug=slugify(req.body.name)
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APPNAME}/subcategories`
    })

    req.body.image={secure_url,public_id};
    req.body.createdBy=req.user._id;
    req.body.updatedBy=req.user._id;

    const subcategory=await subcategoriesModel.create(req.body)
   
   return res.json({message: subcategory});
}

export const getall=async(req,res,next)=>{
    const {id}=req.params;
    const subcategories=await subcategoriesModel.find({categoryId:id});
    return res.status(200).json({message:'Success',subcategories});
}
export const getactive=async(req,res)=>{
    const categories=await subcategoriesModel.find({status:'active'}).select('name image');
    return res.status(200).json(categories);
}
export const getDetails=async(req,res)=>{
    const categoryDetails=await subcategoriesModel.findById(req.params.id);
    return res.status(200).json({message:'success',categoryDetails})
};

export const update=async(req,res)=>{
   
    const category=await subcategoriesModel.findById(req.params.id);
   
    if(!category){
        return res.status(404).json({message:'category not found'});
    }
  
    category.name=req.body.name.toLowerCase();

    if(await subcategoriesModel.findOne({name:req.body.name,_id:{$ne:req.params.id}})){
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
    const category=await subcategoriesModel.findByIdAndDelete(req.params.id);

    if(!category){
        return res.status(404).json({message:'No category found'})
    }
    category.updatedBy=req.user._id

    await cloudinary.uploader.destroy(category.image.public_id);
    return res.status(200).json({message:'success',category})
}
