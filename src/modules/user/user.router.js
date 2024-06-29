import { Router } from "express";
import { endPoints } from '../user/user.role.js';
import { auth } from "../../middleware/auth.js";
import * as userController from './user.controller.js'
import { asyncHandlar } from './../../ults/catcherror.js';

const router=Router();

router.get('/getall',auth(endPoints.getall),asyncHandlar(userController.getAll))
router.get('/getuserdata',auth(endPoints.getdata),asyncHandlar(userController.getUserData))


export default router;