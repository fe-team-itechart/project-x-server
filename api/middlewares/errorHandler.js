/**
 * TODO: it needs to convert to class with logging.
 * @param {*} error: error string
 * @param {*} options : object of options
 */

const ErrorHandler = (error, options) => {
  options && options.show && console.log(error);
};

const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);
  res.status(error.status).json({ name: error.name, status: error.status, message: error.message });
};

module.exports = {
  ErrorHandler,
  errorHandlerMiddleware,
};
