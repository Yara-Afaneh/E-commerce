import { Router } from "express";
import * as orderController from './order.controller.js'
import { endPoints } from '../order/order.role.js';
import { auth } from "../../middleware/auth.js";
import { asyncHandlar } from "../../ults/catcherror.js";
import validation from "../../middleware/validation.js";
import { addorderSchema, changestatusSchema } from "./order.validation.js";
const router=Router();

router.post('/create',validation(addorderSchema),auth(endPoints.create),asyncHandlar(orderController.create))
router.get('/getorders',auth(endPoints.all),asyncHandlar(orderController.getorders))
router.get('/getUserorders',auth(endPoints.getUserorders),asyncHandlar(orderController.getUserorders))
router.patch('/changeStatus/:id',validation(changestatusSchema),auth(endPoints.changeStatus),asyncHandlar(orderController.changeStatus))


export default router;