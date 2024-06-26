import { Router } from "express";
import * as cartController from './cart.controller.js'
import { endPoints } from '../cart/cart.role.js';
import { auth } from "../../middleware/auth.js";
const router=Router();

router.post('/create',auth(endPoints.create),cartController.create)
router.patch('/remove/:id',auth(endPoints.delete),cartController.remove)
router.patch('/clearcart',auth(endPoints.delete),cartController.clearCart)
router.patch('/updatequantity/:id',auth(endPoints.delete),cartController.updateQuantity)

export default router;