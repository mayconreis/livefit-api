import joi from 'joi';

export const createUserSchema = joi.object().keys({
  fullName: joi
    .string()
    .min(3)
    .max(250)
    .required()
    .trim()
    .regex(/^[a-zA-Z ]+$/, 'name'),
  email: joi.string().email({ minDomainSegments: 2 }).min(5).max(100).required().trim(),
  password: joi.string().min(8).max(250).required(),
  confirmPassword: joi.valid(joi.ref('password')).required().messages({ 'any.only': 'As senhas devem ser iguais' }),
});
