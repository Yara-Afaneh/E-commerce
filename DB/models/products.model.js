import mongoose, { Schema, model } from 'mongoose';
import { Types } from 'mongoose';

const productsSchema = new Schema({
   name:{
    type:String,
    unique:true,
    required:true,
    trim:true
  
  },
  slug:{
     type:String,
     required:true,
  },
  description:{
    type:String,
    required:true,
  },
  stock:{
    type:Number,
    default:1,
  },
  discount:{
    type:Number,
    default:0,
  },
  finalprice:{
    type:Number
  },
  mainImage:{
    type:Object,
    required:true,
  },
  subImage:[{
    type:Object,
    required:true,
  }],
  status:{
    type:String,
    default:'active',
    enum:['active','not_active']
  },
  sizes:[{
    type:String,
    enum:['s','l','m','xl']
  }],
  colors:[{
    type:String
  }],
  categoryId:{
    type:Types.ObjectId,
    ref:'categories',
    required:true
  },
  subcategoryId:{
    type:Types.ObjectId,
    ref:'subcategories',
    required:true
  },
  createdby:{type:Types.ObjectId,ref:'user'},
  updatedby:{type:Types.ObjectId,ref:'user'}

  },{
    timestamps:true,
  },
 

 
);


const productsModel=model('products',productsSchema);

export default productsModel;