import { Router } from "express";
import * as productsController from './products.controller.js'
import { endPoints } from './../products/products.role.js';
import { auth } from "../../middleware/auth.js";
import fileUpload, { fileType } from "../../ults/multer.js";
import reviewRouter from './../review/review.router.js'
import { asyncHandlar } from './../../ults/catcherror.js';
import validation from "../../middleware/validation.js";
import { addproductSchema } from "./products.validation.js";
const router=Router();

router.use('/:productId/review',reviewRouter)
router.post('/create',fileUpload(fileType.image).fields([
    {
        name:'mainImage',maxCount:'1'
    },
    {
        name:'subImage',maxCount:'5'
    }
]),validation(addproductSchema),auth(endPoints.create),asyncHandlar(productsController.create))
router.get('/get',asyncHandlar(productsController.getall))

export default router;