import mongoose, { Schema, model } from 'mongoose';
import { Types } from 'mongoose';

const copounSchema = new Schema({

  name:{
    type:String,
    unique:true,
    required:true,
  },
  amount:{
    type:Number,
    required:true,
  },
  usedBy:[{
      type:Types.ObjectId,
      ref:'user',
      required:true,
     }],   
     expiredDate:{type:Date, required:true}
   
  },{
    timestamps:true,
  }
 
)
 


const copounModel=model('copoun',copounSchema);

export default copounModel;