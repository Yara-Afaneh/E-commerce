import { Router } from "express";
import * as copounController from './copoun.controller.js'
import { endPoints } from '../copoun/copoun.role.js';
import { auth } from "../../middleware/auth.js";
import { asyncHandlar } from "../../ults/catcherror.js";
import validation from "../../middleware/validation.js";
import { createCopounSchema } from "./copoun.validation.js";
const router=Router();

router.post('/create',validation(createCopounSchema),auth(endPoints.create),asyncHandlar(copounController.create))


export default router;