import { Router } from "express";
import * as authController from './auth.controller.js'
import { checkemail } from './../../middleware/checkemail.js';
const router=Router();

router.post('/register',checkemail,authController.register)
router.get('/confirmemail/:token',authController.confirmEmail)
router.get('/login',authController.login)
router.patch('/sendCode',authController.sendCode)
router.patch('/forgetPassword',authController.forgetPassword)
// router.get('/confirmEmail/:token',authController.confirmEmail)

export default router;