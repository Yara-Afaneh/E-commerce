import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
  userName:{
    type:String,
    required:true,
    min:4,
    max:20
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  image:{
    type:Object,
  },
  address:{
    type:String,
    required:true,
    
  },
  confirmEmail:{
    type:Boolean,
    default:false,
  },
  gender:{
    type:String,
    enum:['male','female']
  },
  status:{
    type:String,
    default:'active',
    enum:['active','not_active']
  },
  role:{
    type:String,
    default:'user',
    enum:['admin','user']
  },
  sendCode:{
    type:String,
    default:null,
  },
  phoneNumber:{
    type:String,
    required:true
  }
  },{
    timestamps:true,
  }
);


const userModel=model('user',userSchema);

export default userModel