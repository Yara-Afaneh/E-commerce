import { Router } from "express";
import * as copounController from './copoun.controller.js'
import { endPoints } from '../copoun/copoun.role.js';
import { auth } from "../../middleware/auth.js";
const router=Router();

router.post('/create',auth(endPoints.create),copounController.create)


export default router;