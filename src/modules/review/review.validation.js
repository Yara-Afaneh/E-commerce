import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const addreviewSchema=joi.object({
        comment:joi.string().required(),
        rating:joi.number().max(5).positive().required(),
        image:generalFeilds.image,
       
    });

