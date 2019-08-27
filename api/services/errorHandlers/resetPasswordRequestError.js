const ApplicationError = require('./applicationError');

class ResetPasswordRequestError extends ApplicationError {
  constructor(message) {
    super(message || 'Email incorrect', 400);
  }
}

module.exports = ResetPasswordRequestError;
