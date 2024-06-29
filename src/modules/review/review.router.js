import { Router } from "express";
import * as reviewController from './review.controller.js'
import fileUpload, { fileType } from "../../ults/multer.js";
import  {auth}  from "../../middleware/auth.js";
import { endPoints } from "./review.role.js";
import { asyncHandlar } from './../../ults/catcherror.js';
import validation from "../../middleware/validation.js";
import { addreviewSchema } from "./review.validation.js";
const router=Router({mergeParams:true});


router.post('/add',fileUpload(fileType.image).single('image') ,validation(addreviewSchema),auth(endPoints.add),asyncHandlar(reviewController.addreview))



export default router;