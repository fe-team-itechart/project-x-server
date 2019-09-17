const WrongPasswordError = require('./wrongPasswordError');
const UserNotFoundError = require('./userNotFoundError');
const UserAlreadyExistsError = require('./userAlreadyExistsError');
const ResetPasswordError = require('./resetPasswordError');
const RegistrationFailedError = require('./registrationFailedError');
const ProfileUpdateFailedError = require('./profileUpdateFailedError');

module.exports = {
  WrongPasswordError,
  UserNotFoundError,
  UserAlreadyExistsError,
  ResetPasswordError,
  RegistrationFailedError,
  ProfileUpdateFailedError
};
