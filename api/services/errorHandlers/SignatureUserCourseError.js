const ApplicationError = require('./applicationError');

class SignatureUserCourseError extends ApplicationError {
    constructor(message, status) {
      super(message || 'User does not signature to Course.', status || 400);
    }
}

module.exports = SignatureUserCourseError;