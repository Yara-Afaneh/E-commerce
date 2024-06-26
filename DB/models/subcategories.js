import mongoose, { Schema, model } from 'mongoose';
import { Types } from 'mongoose';

const subcategoriesSchema = new Schema({
   name:{
    type:String,
    unique:true,
    required:true,
    min:4,
    max:20
  },
  slug:{
     type:String,
     required:true,
  },
  image:{
    type:Object,
    required:true,
  },
  status:{
    type:String,
    default:'active',
    enum:['active','not_active']
  },
  categoryId:{
    type:Types.ObjectId,
    required:true,
    ref:'categories'
    
  },
  createdby:{type:Types.ObjectId,ref:'user'},
  updatedby:{type:Types.ObjectId,ref:'user'}

  },{
    timestamps:true,
  }
);


const subcategoriesModel=model('subcategories',subcategoriesSchema);

export default subcategoriesModel