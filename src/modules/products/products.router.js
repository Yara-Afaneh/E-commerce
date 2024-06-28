import { Router } from "express";
import * as productsController from './products.controller.js'
import { endPoints } from './../products/products.role.js';
import { auth } from "../../middleware/auth.js";
import fileUpload, { fileType } from "../../ults/multer.js";
import reviewRouter from './../review/review.router.js'
const router=Router();

router.use('/:productId/review',reviewRouter)
router.post('/create',auth(endPoints.create),fileUpload(fileType.image).fields([
    {
        name:'mainImage',maxCount:'1'
    },
    {
        name:'subImage',maxCount:'5'
    }
]),productsController.create)
router.get('/get',productsController.getall)

export default router;