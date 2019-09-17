const ApplicationError = require('./applicationError');

class TokenNotValidError extends ApplicationError {
  constructor(message) {
    super(message || 'Token not valid.', 400);
  }
}

module.exports = TokenNotValidError;
