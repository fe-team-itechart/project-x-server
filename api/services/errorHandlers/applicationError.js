class ApplicationError extends Error {
  constructor(message, status, type) {
    super();
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message || 'Something went wrong.';
    this.status = status || 500;
    this.type = type || '';
  }
}

module.exports = ApplicationError;
