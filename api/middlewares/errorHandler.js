const ErrorHandler = (error, options) => {
  options && options.show && console.log(error);
};

const errorHandlerMiddleware = (error, req, res, next) => {
  if (error.message) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(400).send({ status: 400, message: error.toString() });
  }
};

module.exports = {
  ErrorHandler,
  errorHandlerMiddleware
};
