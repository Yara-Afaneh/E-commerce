import { Router } from "express";
import { endPoints } from '../user/user.role.js';
import { auth } from "../../middleware/auth.js";
import * as userController from './user.controller.js'

const router=Router();

router.get('/getall',auth(endPoints.getall),userController.getAll)
router.get('/getuserdata',auth(endPoints.getdata),userController.getUserData)


export default router;