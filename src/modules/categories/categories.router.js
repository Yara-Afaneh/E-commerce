import { Router } from "express";
import * as categoriesController from './categories.controller.js'
const router=Router();

router.get('/',categoriesController.getall)

export default router;