const jwt = require('jsonwebtoken');

const {
  UnauthorizedError,
  TokenNotValidError,
} = require('../services/errorHandlers');

const jwtGuard = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new UnauthorizedError();
    }

    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    next();
  } catch (error) {
    throw new TokenNotValidError();
  }
};

module.exports = jwtGuard;
