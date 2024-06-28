import { Router } from "express";
import * as reviewController from './review.controller.js'
import fileUpload, { fileType } from "../../ults/multer.js";
import  {auth}  from "../../middleware/auth.js";
import { endPoints } from "./review.role.js";
const router=Router({mergeParams:true});


router.post('/add',auth(endPoints.add),fileUpload(fileType.image).single('image') ,reviewController.addreview)



export default router;