import { Router } from "express";
import * as authController from './auth.controller.js'
const router=Router();

router.post('/register',authController.register)
router.get('/login',authController.login)
router.patch('/sendCode',authController.sendCode)
router.patch('/forgetPassword',authController.forgetPassword)
// router.get('/confirmEmail/:token',authController.confirmEmail)

export default router;