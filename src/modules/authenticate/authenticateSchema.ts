import joi from 'joi';

const loginSchema = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 }).required().required().trim(),
  password: joi.string().required(),
});

export default loginSchema;
