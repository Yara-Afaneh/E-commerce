import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const addcategorySchema=joi.object({
        name:joi.string().required(),
        image:generalFeilds.image,
    });

    export const getDetailsSchema=joi.object({
        id:generalFeilds.id,
    });

    export const updatecategorySchema=joi.object({
        id:generalFeilds.id,
        name:joi.string().required(),
        image:generalFeilds.image,
    });

    export const deleteSchema=joi.object({
        id:generalFeilds.id,
    });

