import { Router } from "express";
import * as cartController from './cart.controller.js'
import { endPoints } from '../cart/cart.role.js';
import { auth } from "../../middleware/auth.js";
import { asyncHandlar } from "../../ults/catcherror.js";
import validation from "../../middleware/validation.js";
import { creatSchema, removeSchema, updateQuantitySchema } from "./cart.validation.js";
const router=Router();

router.post('/create',validation(creatSchema),auth(endPoints.create),asyncHandlar(cartController.create))
router.patch('/remove/:id',validation(removeSchema),auth(endPoints.delete),asyncHandlar(cartController.remove))
router.patch('/clearcart',auth(endPoints.delete),asyncHandlar(cartController.clearCart))
router.patch('/updatequantity/:id',validation(updateQuantitySchema),auth(endPoints.delete),asyncHandlar(cartController.updateQuantity))

export default router;