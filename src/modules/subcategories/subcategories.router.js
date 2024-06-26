import { Router } from "express";
import * as subcategoriesController from './subcategories.controller.js'
import fileUpload, { fileType } from "../../ults/multer.js";
import  {auth}  from "../../middleware/auth.js";
import { endPoints } from "./subcategories.role.js";
const router=Router({mergeParams:true});


router.post('/add',auth(endPoints.create),fileUpload(fileType.image).single('image') ,subcategoriesController.create)
router.get('/',auth(endPoints.get),subcategoriesController.getall)
router.get('/active',auth(endPoints.getactive),subcategoriesController.getactive)
router.get('/:id',auth(endPoints.get),subcategoriesController.getDetails)
router.patch('/:id',auth(endPoints.create),fileUpload(fileType.image).single('image'),subcategoriesController.update)
router.delete('/:id',auth(endPoints.delete),subcategoriesController.destroy)


export default router;