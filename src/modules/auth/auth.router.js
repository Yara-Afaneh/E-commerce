import { Router } from "express";
import * as authController from './auth.controller.js'
import { checkemail } from './../../middleware/checkemail.js';
import { asyncHandlar } from "../../ults/catcherror.js";
import validation from "../../middleware/validation.js";
import { loginSchema, registerSchema, sendCodeSchema,forgetPasswordSchema, excelSchema} from "./auth.validation.js";
import fileUpload, { fileType } from "../../ults/multer.js";
const router=Router();

router.post('/register',validation(registerSchema),checkemail,asyncHandlar(authController.register))
router.post('/excel',fileUpload(fileType.excel).single('excel'),validation(excelSchema),asyncHandlar(authController.addUserExcel))
router.get('/confirmemail/:token',asyncHandlar(authController.confirmEmail))
router.get('/login',validation(loginSchema),asyncHandlar(authController.login))
router.patch('/sendCode',validation(sendCodeSchema),asyncHandlar(authController.sendCode))
router.patch('/forgetPassword',validation(forgetPasswordSchema),asyncHandlar(authController.forgetPassword))


export default router;