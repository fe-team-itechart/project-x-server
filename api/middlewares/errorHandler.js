const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(11111);
  const { name, status, message } = error;
  res.status(error.status).json({
    name,
    status,
    message,
  });
};

module.exports = {
  errorHandlerMiddleware,
};
