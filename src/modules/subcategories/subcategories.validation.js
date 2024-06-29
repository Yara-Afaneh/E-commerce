import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const addsubcategorySchema=joi.object({
        name:joi.string().required(),
        categoryId:generalFeilds.id,
        image:generalFeilds.image,
    });

    export const getdetailsSchema=joi.object({
        id:generalFeilds.id,
    });

    export const updatesubcategorySchema=joi.object({
        name:joi.string().required(),
        id:generalFeilds.id,
        image:generalFeilds.image,
    });

    export const deletesubcategorySchema=joi.object({
        id:generalFeilds.id,
    });

