import joi from "joi";

export const createCopounSchema=joi.object({
        name:joi.string().required(),
        amount:joi.number().integer().required(),
        expiredDate: joi.date().required().greater('now').messages({
            'date.greater': 'expiredDate must be in the future'
          }),
    });

