const ApplicationError = require('./applicationError');

class ProfileUpdateFailedError extends ApplicationError {
  constructor(message) {
    super(message || 'Profile update failed.', 500);
  }
}

module.exports = ProfileUpdateFailedError;
