const ApplicationError = require('./applicationError');

class UserNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'User not found.', 400);
  }
}

module.exports = UserNotFoundError;
