const errorHandlerMiddleware = (error, req, res, next) => {
  const { name, status, message, type } = error;
  res.status(error.status).json({
    name,
    status,
    message,
    type,
  });
};

module.exports = {
  errorHandlerMiddleware,
};
