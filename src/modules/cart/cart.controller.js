
import cartModel from '../../../DB/models/cart.model.js';

export const create =async(req,res)=>{

   const {productId}=req.body;
   const cart = await cartModel.findOne({userId: req.user._id});
   if(!cart){
      const newcart=await cartModel.create({
        userId: req.user._id,
        products:{productId}
      })
      return res.status(200).json({message:'success',cart:newcart})
   }

   for(let i=0;i<cart.products.length;i++){
    if(cart.products[i].productId == productId){
        return res.status(404).json({message:'product already exist'})
    }
   }
   cart.products.push({productId: productId});
   await cart.save();
   return res.status(200).json({message:'success',cart:cart});

   
}

export const remove=async(req,res)=>{
    const productId = req.params.id;

    const cart =await cartModel.findOneAndUpdate({userId: req.user._id},{
        $pull:{
            products:{
                productId:productId
            }
        }
    },{new:true})

    return res.status(200).json({message:'success',cart:cart})
}

export const clearCart=async(req,res)=>{
    const cart= await cartModel.findOneAndUpdate({userId: req.user._id},{products:[]},{new:true})
    return res.status(200).json({message:'success'},cart)
}
export const updateQuantity=async(req,res)=>{
    const {quantity,operator}=req.body;

    const incr=(operator=='+')?quantity:-quantity;
    const cart= await cartModel.findOneAndUpdate({userId: req.user._id,
        "products.productId": req.params.id},
        {$inc:{
            "products.$.quantity":incr
        }},{
            new:true,
        })

        return res.status(200).json({message:'success',cart})
}