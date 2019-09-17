const ApplicationError = require('./applicationError');

class UnauthorizedError extends ApplicationError {
  constructor(message) {
    super(message || 'Unauthorized.', 401);
  }
}

module.exports = UnauthorizedError;
