
import cartModel from '../../../DB/models/cart.model.js';
import { Apperror } from '../../ults/Apperror.js';

export const create =async(req,res,next)=>{

   const {productId}=req.body;
   const cart = await cartModel.findOne({userId: req.user._id});
   if(!cart){
      const newcart=await cartModel.create({
        userId: req.user._id,
        products:{productId}
      })
      return next(new Apperror('success',201));
   }

   for(let i=0;i<cart.products.length;i++){
    if(cart.products[i].productId == productId){
        return next(new Apperror('product already exist',404));
    }
   }
   cart.products.push({productId: productId});
   await cart.save();
   return next(new Apperror('success',201));

   
}

export const remove=async(req,res,next)=>{
    const productId = req.params.id;

    const cart =await cartModel.findOneAndUpdate({userId: req.user._id},{
        $pull:{
            products:{
                productId:productId
            }
        }
    },{new:true})
    return next(new Apperror('success',201));
}

export const clearCart=async(req,res,next)=>{
    const cart= await cartModel.findOneAndUpdate({userId: req.user._id},{products:[]},{new:true})
    return next(new Apperror('success',201));
}
export const updateQuantity=async(req,res,next)=>{
    const {quantity,operator}=req.body;

    const incr=(operator=='+')?quantity:-quantity;
    const cart= await cartModel.findOneAndUpdate({userId: req.user._id,
        "products.productId": req.params.id},
        {$inc:{
            "products.$.quantity":incr
        }},{
            new:true,
        })

        return next(new Apperror('success',201));
}