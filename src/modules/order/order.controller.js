import cartModel from "../../../DB/models/cart.model.js";
import copounModel from './../../../DB/models/copoun.model.js';
import productsModel from './../../../DB/models/products.model.js';
import userModel from './../../../DB/models/user.model.js';
import orderModel from './../../../DB/models/order.model.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.stripeKey);



export const create = async (req, res) => {
  const { copounName} = req.body;
  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart || cart.products.length === 0) {
    return res.status(404).json({ message: "cart is empty" });
  }
  req.body.product=cart.products
  

  if (copounName) {
    const copoun = await copounModel.findOne({ name: copounName });

    if (!copoun) {
      return res.status(400).json({ message: "copoun not found" });
    }
    if (copoun.expiredDate < new Date()) {
      return res.status(400).json({ message: "copoun expired" });
    }
  
    if (copoun.usedBy.includes(req.user._id)) {
      return res.status(409).json({ message: "copoun already used" });
    }
    req.body.copoun = copoun;
  }
  let finalProductlist = [];
  let subtotal = 0;

  for(let product of req.body.product) { 
    const checkProduct=await productsModel.findOne({
        _id:product.productId,
        stock:{$gte:product.quantity}
    })
  
    if(!checkProduct){
        return res.status(400).json({ message:'product quantity not available' });
    }
    product=product.toObject();
    product.name=checkProduct.name;
    product.unitPrice=checkProduct.unitPrice;
    product.discount=checkProduct.discount;
    product.finalPrice=product.quantity * checkProduct.finalprice;
    subtotal+=product.finalPrice;

    finalProductlist.push(product);
  }


  const user=await userModel.findById(req.user._id)

  if(!req.body.phone){
    req.body.phoneNumber=user.phoneNumber;
  }
  if(!req.body.address){
    req.body.address=user.address;
  }


    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data:{
             currency:'USD',
             unit_amount:subtotal-(subtotal*((req.body.copoun?.amount || 0))/100),
             product_data:{
              name:user.userName,
             }
          } ,
          quantity: 1,

        },
      ],
      mode: 'payment',
      success_url: `https://www.facebook.com`,
      cancel_url: `https://www.youtube.com`,
    });
 
return res.json(session);
 
  
  const order=await orderModel.create({
    userId:req.user._id,
    products:finalProductlist,
    totalPrice:subtotal-(subtotal*((req.body.copoun?.amount || 0))/100),
    address:req.body.address,
    phoneNumber:req.body.phoneNumber,
    updatedby:req.user._id,
  })



  if(order){
    for(const product of req.body.product){
      await productsModel.findOneAndUpdate({_id:product.productId},{
        $inc:{
          stock:-product.quantity,
        }
      })
  }

  if (req.body.copoun) {
    await copounModel.updateOne({_id:req.body.copoun._id},{
      $addToSet:{
        usedBy:req.user._id,
      }
    })
  }

  await cartModel.updateOne({userId:req.user._id},{
    products:[]
  })

}

  

 

  return res.status(200).json({message:'success',order})
}

export const getorders=async(req,res)=>{
 const orders= await orderModel.find({$or:[
  {
    status:'pending',
  },
  {
    status:'confirmed'
  }
 ]});
 return res.status(200).json({message:'success',orders});
}

export const getUserorders=async(req,res)=>{
  const orders= await orderModel.find({userId:req.user._id})
  return res.status(200).json({message:'success',orders});
 }

 export const changeStatus=async(req,res)=>{
 const orderId=req.params;
 const {status}=req.body;



 const order= await orderModel.findById(orderId.id)
 if(!order){
  return res.status(409).json({message:'order not found'});
 }
 order.status=status;
 await order.save();

 return res.status(200).json({message:'success',order});
 }




