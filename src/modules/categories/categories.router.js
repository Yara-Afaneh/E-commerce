import { Router } from "express";
import * as categoriesController from './categories.controller.js'
import fileUpload, { fileType } from "../../ults/multer.js";
import subcategoriesRouter from './../subcategories/subcategories.router.js'
import  {auth}  from "../../middleware/auth.js";
import { endPoints } from "./category.role.js";
const router=Router({caseSensitive: true});

router.use('/:id/subcategories',subcategoriesRouter)
router.post('/add',auth(endPoints.create),fileUpload(fileType.image).single('image') ,categoriesController.create)
router.get('/',auth(endPoints.get),categoriesController.getall)
router.get('/active',auth(endPoints.getactive),categoriesController.getactive)
router.get('/:id',auth(endPoints.get),categoriesController.getDetails)
router.patch('/:id',auth(endPoints.create),fileUpload(fileType.image).single('image'),categoriesController.update)
router.delete('/:id',auth(endPoints.delete),categoriesController.destroy)


export default router;