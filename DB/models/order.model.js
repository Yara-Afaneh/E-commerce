import mongoose, { Schema, model } from 'mongoose';
import { Types } from 'mongoose';

const orderSchema = new Schema({
   userId:{
    type:Types.ObjectId,
    ref:'user',
    required:true,
   },
   products:[{
      productname:{type:String},
      productId:{type:Types.ObjectId,ref:'products',required:true},
      quantity:{type:Number,default:1,required:true},
      unitPrice:{type:Number,required:true},
      finalPrice:{type:Number,required:true},
   }],
   totalPrice:{type:Number,required:true},
   address:{type:String,required:true},
   phoneNumber:{type:String,required:true},
   paymentMethod:{type:String,enum:['cash','card'],default:'cash'},
   copounId:{type:Types.ObjectId,ref:'copoun'},
   status:{type:String,default:'pending',enum:['pending','cancelled','confirmed','onway','received']},
   notes:{type:String},
   rejectedreason:{type:String},
   updatedby:{type:Types.ObjectId,required:true,ref:'user'},
  },{
    timestamps:true,
  }
 
)
 


const orderModel=model('order',orderSchema);

export default orderModel;