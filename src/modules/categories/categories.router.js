import { Router } from "express";
import * as categoriesController from './categories.controller.js'
import fileUpload, { fileType } from "../../ults/multer.js";
import subcategoriesRouter from './../subcategories/subcategories.router.js'
import  {auth}  from "../../middleware/auth.js";
import { endPoints } from "./category.role.js";
import { asyncHandlar } from "../../ults/catcherror.js";
import validation from "../../middleware/validation.js";
import { addcategorySchema, deleteSchema, getDetailsSchema, updatecategorySchema } from "./categories.validation.js";
const router=Router({caseSensitive: true});

router.use('/:id/subcategories',subcategoriesRouter)
router.post('/add',fileUpload(fileType.image).single('image'),validation(addcategorySchema ),auth(endPoints.create),asyncHandlar(categoriesController.create))
router.get('/',auth(endPoints.get),asyncHandlar(categoriesController.getall))
router.get('/active',auth(endPoints.getactive),asyncHandlar(categoriesController.getactive))
router.get('/:id',validation(getDetailsSchema),auth(endPoints.get),asyncHandlar(categoriesController.getDetails))
router.patch('/:id',fileUpload(fileType.image).single('image'),validation(updatecategorySchema),auth(endPoints.create),asyncHandlar(categoriesController.update))
router.delete('/:id',validation(deleteSchema),auth(endPoints.delete),asyncHandlar(categoriesController.destroy))


export default router;