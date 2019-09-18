const jwt = require('jsonwebtoken');

const refreshToken = (req, res, next) => {
  const { id, email } = jwt.decode(req.headers.authorization);

  const user = {
    id,
    email,
  };

  const token = jwt.sign(user, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });

  req.headers.authorization = token;
  next();
};

module.exports = { refreshToken };
