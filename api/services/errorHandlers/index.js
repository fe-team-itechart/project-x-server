const WrongPasswordError = require('./wrongPasswordError');
const UserNotFoundError = require('./userNotFoundError');
const UserAlreadyExistsError = require('./userAlreadyExistsError');
const ResetPasswordApproveError = require('./resetPasswordApproveError');
const ResetPasswordError = require('./resetPasswordError');
const ResetPasswordRequestError = require('./resetPasswordRequestError');

module.exports = {
  WrongPasswordError,
  UserNotFoundError,
  UserAlreadyExistsError,
  ResetPasswordApproveError,
  ResetPasswordError,
  ResetPasswordRequestError
};
