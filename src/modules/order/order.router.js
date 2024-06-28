import { Router } from "express";
import * as orderController from './order.controller.js'
import { endPoints } from '../order/order.role.js';
import { auth } from "../../middleware/auth.js";
const router=Router();

router.post('/create',auth(endPoints.create),orderController.create)
router.get('/getorders',auth(endPoints.all),orderController.getorders)
router.get('/getUserorders',auth(endPoints.getUserorders),orderController.getUserorders)
router.patch('/changeStatus/:id',auth(endPoints.changeStatus),orderController.changeStatus)


export default router;