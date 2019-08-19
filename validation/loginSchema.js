const Joi = require('@hapi/joi');

const schema = Joi.object()
  .keys({
    password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*?]{8,32}$/),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .max(255),
  })
  .with('password', 'email');

module.exports = schema;
