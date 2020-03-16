const WrongPasswordError = require('./wrongPasswordError');
const NotFoundError = require('./notFoundError');
const UserAlreadyExistsError = require('./userAlreadyExistsError');
const ResetPasswordError = require('./resetPasswordError');
const RegistrationFailedError = require('./registrationFailedError');
const UnauthorizedError = require('./unauthorizedError');
const TokenNotValidError = require('./tokenNotValidError');
const SubscribeUserToCourseError = require('./SubscribeUserToCourseError');

module.exports = {
  WrongPasswordError,
  NotFoundError,
  UserAlreadyExistsError,
  ResetPasswordError,
  RegistrationFailedError,
  UnauthorizedError,
  TokenNotValidError,
  SubscribeUserToCourseError
};
