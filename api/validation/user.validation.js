const Joi = require('@hapi/joi');

const keys = {
  firstName: Joi.string()
    .min(1)
    .max(20),
  lastName: Joi.string()
    .min(1)
    .max(20),
  email: Joi.string()
    .max(255)
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .min(8)
    .max(32)
    .regex(/^[a-zA-Z0-9!@#$%^&*?]/)
    .required(),
  passwordConfirm: Joi.ref('password'),
};

const registrationSchema = Joi.object().keys(keys);
const loginSchema = Joi.object().keys(keys).optionalKeys('firstName', 'lastName', 'passwordConfirm');

module.exports = {
  loginSchema,
  registrationSchema,
  
};
