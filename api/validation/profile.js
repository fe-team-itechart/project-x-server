const Joi = require('@hapi/joi');

const { firstNameSchema, lastNameSchema } = require('../validation/auth');

const descriptionSchema = Joi.string().max(255);

const socialSchema = Joi.string().uri();

const publicProfileValidate = profile => {
  let errors = {};
  const {
    firstName,
    lastName,
    description,
    twitterLink,
    facebookLink,
    linkedInLink,
  } = profile;

  const firstNameValidate = Joi.validate(firstName, firstNameSchema);
  const lastNameValidate = Joi.validate(lastName, lastNameSchema);
  const descriptionValidate = description
    ? Joi.validate(description, descriptionSchema)
    : '';
  const twitterLinkValidate = twitterLink
    ? Joi.validate(twitterLink, socialSchema)
    : '';
  const facebookLinkValidate = facebookLink
    ? Joi.validate(facebookLink, socialSchema)
    : '';
  const linkedInLinkValidate = linkedInLink
    ? Joi.validate(linkedInLink, socialSchema)
    : '';

  if (firstNameValidate.error) {
    errors.firstName = firstNameValidate.error.details[0].message.replace(
      '"value"',
      'First name'
    );
  }

  if (lastNameValidate.error) {
    errors.lastName = lastNameValidate.error.details[0].message.replace(
      '"value"',
      'Last name'
    );
  }

  if (descriptionValidate.error) {
    errors.description = descriptionValidate.error.details[0].message.replace(
      '"value"',
      'Description'
    );
  }

  if (twitterLinkValidate.error) {
    errors.twitterLink = twitterLinkValidate.error.details[0].message.replace(
      '"value"',
      'Twitter link'
    );
  }

  if (facebookLinkValidate.error) {
    errors.facebookLink = facebookLinkValidate.error.details[0].message.replace(
      '"value"',
      'Facebook link'
    );
  }

  if (linkedInLinkValidate.error) {
    errors.linkedInLink = linkedInLinkValidate.error.details[0].message.replace(
      '"value"',
      'Linkedin link'
    );
  }

  return errors;
};

module.exports = {
  publicProfileValidate,
};
