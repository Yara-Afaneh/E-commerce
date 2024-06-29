import { Router } from "express";
import * as subcategoriesController from './subcategories.controller.js'
import fileUpload, { fileType } from "../../ults/multer.js";
import  {auth}  from "../../middleware/auth.js";
import { endPoints } from "./subcategories.role.js";
import { asyncHandlar } from './../../ults/catcherror.js';
import validation from "../../middleware/validation.js";
import { addsubcategorySchema, deletesubcategorySchema, getdetailsSchema, updatesubcategorySchema } from "./subcategories.validation.js";
const router=Router({mergeParams:true});


router.post('/add',fileUpload(fileType.image).single('image') ,validation(addsubcategorySchema),auth(endPoints.create),asyncHandlar(subcategoriesController.create))
router.get('/',auth(endPoints.get),asyncHandlar(subcategoriesController.getall))
router.get('/active',auth(endPoints.getactive),asyncHandlar(subcategoriesController.getactive))
router.get('/:id',validation(getdetailsSchema),auth(endPoints.get),asyncHandlar(subcategoriesController.getDetails))
router.patch('/:id',fileUpload(fileType.image).single('image'),validation(updatesubcategorySchema),auth(endPoints.create),asyncHandlar(subcategoriesController.update))
router.delete('/:id',validation(deletesubcategorySchema),auth(endPoints.delete),asyncHandlar(subcategoriesController.destroy))


export default router;