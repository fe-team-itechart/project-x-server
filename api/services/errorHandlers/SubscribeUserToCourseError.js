const ApplicationError = require('./applicationError');

class SubscribeUserToCourseError extends ApplicationError {
    constructor(message, status) {
      super(message || 'User doesn\'t signature to Course.', status || 400);
    }
}

module.exports = SubscribeUserToCourseError;