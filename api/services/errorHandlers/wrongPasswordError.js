const ApplicationError = require('./applicationError');

class WrongPasswordError extends ApplicationError {
  constructor(message) {
    super(message || 'Wrong password', 403);
  }
}

module.exports = WrongPasswordError;
