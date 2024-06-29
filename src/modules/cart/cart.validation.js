import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const creatSchema=joi.object({
       productId:generalFeilds.id
    });

export const removeSchema=joi.object({
    id:generalFeilds.id
});

export const updateQuantitySchema=joi.object({
    id:generalFeilds.id,
    quantity:joi.number().integer().required(),
    operator:joi.valid('+','-')
});


