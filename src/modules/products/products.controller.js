import slugify from 'slugify';
import categoriesModel from '../../../DB/models/categories.model.js';
import productsModel from '../../../DB/models/products.model.js';
import subcategoriesModel from './../../../DB/models/subcategories.js';
import cloudinary from './../../ults/cloudinary.js';
import { pagination } from '../../ults/pagination.js';


export const create =async(req,res,next)=>{

   const {name,unitPrice,discount,categoryId,subcategoryId}=req.body;
  

   const category= await categoriesModel.findById(categoryId)

    if (!category){
        return res.status(404).json({message:'Category not found'})
    }
    const subcategory =await subcategoriesModel.findOne({_id:subcategoryId,categoryId:categoryId});
    if(!subcategory){
        return res.status(404).json({message:'Sub Category not found'})
    }

  

    req.body.slug=slugify(name);
    req.body.finalprice= unitPrice-((unitPrice*(discount || 0 ))/100)

    const {secure_url,public_id}=await cloudinary.uploader.upload(req.files.mainImage[0].path,{
        folder:`${process.env.APPNAME}/products/${name}`
    })

    req.body.mainImage={secure_url,public_id};
   
    req.body.subImage=[];
    if(req.files.subImage){
    for(const file of req.files.subImage){
        const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{
            folder:`${process.env.APPNAME}/products/${name}/subImages`
        })
        req.body.subImage.push={secure_url,public_id}
    }}
    
    
    const product =await productsModel.create(req.body)
    
   
   return res.status(200).json({message:'success', product});
}

export const getall=async(req,res,next)=>{

    const {skip,limit}=pagination(req.query.page,req.query.limit)
    let queryObj={...req.query};
    const execQuery=['page','limit','sort','search'];
    execQuery.map((ele)=>{
        delete queryObj[ele];
    })

    queryObj=JSON.stringify(queryObj);
    queryObj=queryObj.replace(/gt|gte|lt|lte|in|nin|eq/g,match=>`$${match}`);
    queryObj=JSON.parse(queryObj);
    const mongooseQuery = productsModel.find(queryObj).skip(skip).limit(limit).populate({
        path:'review',
        populate:{
            path:'userId',
            select:'userName _id'
        }
        })

    if(req.query.search){
        mongooseQuery.find({
            $or:[
                {name:{$regex:req.query.search}},
                {description:{$regex:req.query.search}}
            ]
        })
    }
    const count=await productsModel.estimatedDocumentCount();
    mongooseQuery.select(req.query.fields)
        let products=await mongooseQuery.sort(req.query.sort);
        products=products.map(product =>{
            return {
                ...product.toObject(),
                mainImage:product.mainImage.secure_url,
                subImage:product.subImage.map(img=>img.secure_url)
            }
        })
    return res.status(200).json({message:'success',count,products});
   }