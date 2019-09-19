const errorHandlerMiddleware = (error, req, res, next) => {
  res
    .status(error.status)
    .json({
      name: error.name,
      status: error.status,
      message: error.message,
      type: error.type,
    });
};

module.exports = {
  errorHandlerMiddleware,
};
