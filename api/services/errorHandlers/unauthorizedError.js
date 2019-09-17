const ApplicationError = require('./applicationError');

class UnauthorizedError extends ApplicationError {
  constructor(message) {
    super(message || 'Unauthorized.', 403);
  }
}

module.exports = UnauthorizedError;
