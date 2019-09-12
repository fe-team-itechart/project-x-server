const ApplicationError = require('./applicationError');

class ResetPasswordError extends ApplicationError {
    constructor(message){
        super(message || 'Link not found', 400);
    }
}

module.exports = ResetPasswordError;
