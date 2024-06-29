import joi from "joi";
import { generalFeilds } from "../../middleware/validation.js";

export const registerSchema=joi.object({
        userName:joi.string().alphanum().min(3).max(20).required(),
        email:generalFeilds.email,
        password:generalFeilds.password,
        confirmPassword:joi.valid(joi.ref('password')).required(),
        address:joi.string().required(),
        phoneNumber:joi.string().required(),
    });

export const loginSchema=joi.object({
    email:generalFeilds.email,
    password:generalFeilds.password,
});

export const sendCodeSchema=joi.object({
    email:generalFeilds.email,
});

export const forgetPasswordSchema=joi.object({
    email:generalFeilds.email,
    password:generalFeilds.password,
    code:joi.string().required().length(4),
})

export const excelSchema = joi.object({
    excel: joi.object({
      mimetype: joi.string().valid(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ).required(),
      size: joi.number().max(5000000).required() 
    }).required()
  });

