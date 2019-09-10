const WrongPasswordError = require('./wrongPasswordError');
const UserNotFoundError = require('./userNotFoundError');
const UserAlreadyExistsError = require('./userAlreadyExistsError');
const ResetPasswordError = require('./resetPasswordError');
const RegistrationFailedError = require('./registrationFailedError');

module.exports = {
  WrongPasswordError,
  UserNotFoundError,
  UserAlreadyExistsError,
  ResetPasswordError,
  RegistrationFailedError,
};
