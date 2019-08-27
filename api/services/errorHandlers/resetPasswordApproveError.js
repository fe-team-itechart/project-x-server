const ApplicationError = require('./applicationError');

class ResetPasswordApproveError extends ApplicationError {
    constructor(message){
        super(message || 'Link not found', 400);
    }
}

module.exports = ResetPasswordApproveError;
