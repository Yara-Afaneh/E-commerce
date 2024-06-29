import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const addproductSchema=joi.object({
        name:joi.string().required(),
        mainImage:joi.array().items({ 
            fieldname:joi.string().required(),
            originalname:joi.string().required(),
            encoding:joi.string().required(),
            mimetype:joi.string().valid('image/png','image/jpeg','image/webp').required(),
            destination:joi.string().required(),
            filename:joi.string().required(),
            path:joi.string().required(),
            size:joi.number().max(1000000).required()}).required().max(1),
        subImage:joi.array().items(generalFeilds.image).max(5), 
        categoryId:generalFeilds.id,
        subcategoryId:generalFeilds.id,
        description:joi.string().required(),
        discount:joi.number().integer().min(0).max(100).required(),
        unitPrice:joi.number().positive().required(),
        sizes:joi.array().items(joi.string().valid('s','l','m','xl')).optional(),
        stock:joi.number().integer().min(0).default(1).optional(),
    });

