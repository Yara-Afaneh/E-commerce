import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const addorderSchema=joi.object({
    copounName:joi.string().optional(),
    paymentMethod:joi.string().valid('cash','card').optional(),
       
    });

    export const changestatusSchema=joi.object({
        status:joi.array().items(joi.string().valid('pending','cancelled','confirmed','onway','received')).required(),
        id:generalFeilds.id,
           
        });

