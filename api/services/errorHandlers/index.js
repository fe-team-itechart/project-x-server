const WrongPasswordError = require('./wrongPasswordError');
const UserNotFoundError = require('./userNotFoundError');
const UserAlreadyExistsError = require('./userAlreadyExistsError');
const ResetPasswordError = require('./resetPasswordError');
const RegistrationFailedError = require('./registrationFailedError');
const UnauthorizedError = require('./unauthorizedError');
const TokenNotValidError = require('./tokenNotValidError');

module.exports = {
  WrongPasswordError,
  UserNotFoundError,
  UserAlreadyExistsError,
  ResetPasswordError,
  RegistrationFailedError,
  UnauthorizedError,
  TokenNotValidError,
};
