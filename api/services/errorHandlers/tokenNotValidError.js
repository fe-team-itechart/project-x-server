const ApplicationError = require('./applicationError');

class TokenNotValidError extends ApplicationError {
  constructor(message) {
    super(message || 'Token not valid.', 401);
  }
}

module.exports = TokenNotValidError;
