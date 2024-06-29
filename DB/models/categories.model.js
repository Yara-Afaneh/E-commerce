import mongoose, { Schema, model } from 'mongoose';
import { Types } from 'mongoose';

const categoriesSchema = new Schema({
   name:{
    type:String,
    unique:true,
    required:true,
    minLength:4,
    maxLength:20
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
  createdby:{type:Types.ObjectId,ref:'user'},
  updatedby:{type:Types.ObjectId,ref:'user'}

  },{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  },
 
);
categoriesSchema.virtual('subcategory',{
  localField:'_id',
  foreignField:'categoryId',
  ref:'subcategories'
})


const categoriesModel=model('categories',categoriesSchema);

export default categoriesModel