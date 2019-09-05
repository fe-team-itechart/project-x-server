const ApplicationError = require('./applicationError');

class RegistrationFailedError extends ApplicationError {
  constructor(message) {
    super(message || 'Registration failed.', 500);
  }
}

module.exports = RegistrationFailedError;
