
import reviewModel from "../../../DB/models/review.model.js";
import subcategoriesModel from "../../../DB/models/subcategories.js";
import cloudinary from "../../ults/cloudinary.js";
import orderModel from './../../../DB/models/order.model.js';



export const addreview=async(req,res)=>{

    const {productId}=req.params;
    const {comment,rating}=req.body;


    const order=await orderModel.findOne({
        userId: req.user._id,
        status:'received',
        "products.productId":productId,
    });

    if(!order){
        return res.status(404).json({message: 'No order found'})
    }

    const checkreview=await reviewModel.findOne({
        userId: req.user._id,
        productId: productId,
    });

    if(checkreview){
        return res.status(409).json({message:'review already exists'})
    }
 
    if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APPNAME}/${productId}/review`
        });
        req.body.image={secure_url,public_id}
    }

    const review=await reviewModel.create({
        comment,rating,productId,userId:req.user._id,image:req.body.image,
    })
  return res.status(201).json({message:'success',review})
}

