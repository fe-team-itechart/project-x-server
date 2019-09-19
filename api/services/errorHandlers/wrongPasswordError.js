const ApplicationError = require('./applicationError');

class WrongPasswordError extends ApplicationError {
  constructor(message) {
    super(message || 'Wrong password', 400, 'password');
  }
}

module.exports = WrongPasswordError;
