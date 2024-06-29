import 'dotenv/config'
import express from 'express'
import initApp from './src/app.router.js';
import validation from './src/middleware/validation.js';
import { auth } from './src/middleware/auth.js';
import { addorderSchema } from './src/modules/order/order.validation.js';
import { asyncHandlar } from './src/ults/catcherror.js';
import { endPoints } from './src/modules/order/order.role.js';
import * as orderController from './src/modules/order/order.controller.js'



const app = express();
const PORT=process.env.PORT || 3000

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//    const sig = request.headers['stripe-signature'];
 
//    let event;
 
//    try {
//      event = stripe.webhooks.constructEvent(request.body, sig,process.env.endpointsig);
//    } catch (err) {
//      response.status(400).send(`Webhook Error: ${err.message}`);
//      return;
//    }

//    if(event.type=='checkout.session.completed'){
//       router.post('/create',validation(addorderSchema),auth(endPoints.create),asyncHandlar(orderController.create))
//       const checkoutsessioncompleted=event.data.object
//    }else{
//        return response.json({message:`unhandled event type ${event.type}`})
//    }
 
//    response.send();
//  });

initApp(app,express);

app.listen(PORT,() =>{
   console.log(`server running on port ${PORT}`)
})