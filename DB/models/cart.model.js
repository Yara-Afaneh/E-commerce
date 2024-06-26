import mongoose, { Schema, model } from 'mongoose';
import { Types } from 'mongoose';

const cartSchema = new Schema({
   userId:{
    type:Types.ObjectId,
    ref:'user',
    required:true,
    unique:true
   },
   products:[{
      productId:{type:Types.ObjectId,ref:'products',required:true},
      quantity:{type:Number,default:1},
   }]
  },{
    timestamps:true,
  }
 
)
 


const cartModel=model('cart',cartSchema);

export default cartModel;