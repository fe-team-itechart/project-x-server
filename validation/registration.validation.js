const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  firstName: Joi.string()
    .min(1)
    .max(20)
    .required(),
  lastName: Joi.string()
    .min(1)
    .max(20)
    .required(),
  email: Joi.string()
    .max(64)
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .min(8)
    .max(32)
    .regex(/^[a-zA-Z0-9!@#$%^&*?]/)
    .required(),
  passwordConfirm: Joi.ref('password'),
});
