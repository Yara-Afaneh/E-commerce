import slugify from 'slugify';
import categoriesModel from '../../../DB/models/categories.model.js';
import productsModel from '../../../DB/models/products.model.js';
import subcategoriesModel from './../../../DB/models/subcategories.js';
import cloudinary from './../../ults/cloudinary.js';

export const create =async(req,res)=>{

   const {name,price,discount,categoryId,subcategoryId}=req.body;

   const category= await categoriesModel.findById(categoryId)

    if (!category){
        return res.status(404).json({message:'Category not found'})
    }
    const subcategory =await subcategoriesModel.findOne({_id:subcategoryId,categoryId:categoryId});
    if(!subcategory){
        return res.status(404).json({message:'Sub Category not found'})
    }

  

    req.body.slug=slugify(name);
    req.body.finalprice= price-((price*(discount || 0 ))/100)

    const {secure_url,public_id}=await cloudinary.uploader.upload(req.files.mainImage[0].path,{
        folder:`${process.env.APPNAME}/products/${name}`
    })

    req.body.mainImage={secure_url,public_id};
    req.body.subImage=[];
    for(const file of req.files.subImage){
        const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{
            folder:`${process.env.APPNAME}/products/${name}/subImages`
        })
        req.body.subImage.push={secure_url,public_id}
    }
    
    const product =await productsModel.create(req.body)
    
   
   return res.status(200).json({message:'success', product});
}