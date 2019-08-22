const ApplicationError = require('./applicationError');

class UserAlreadyExists extends ApplicationError {
  constructor(message) {
    super(message || 'User already exists.', 400);
  }
}

module.exports = UserAlreadyExists;
