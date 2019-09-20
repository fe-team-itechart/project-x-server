const errorHandlerMiddleware = (error, req, res, next) => {
  const { name, status, message, type } = error;
  res.status(error.status).json({
    name: name,
    status: status,
    message: message,
    type: type,
  });
};

module.exports = {
  errorHandlerMiddleware,
};
