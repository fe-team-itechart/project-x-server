const jwt = require('jsonwebtoken');

const refreshToken = (req, res, next) => {
  const { id, email } = jwt.decode(req.headers.token);

  const user = {
    id,
    email,
  };

  const token = jwt.sign(user, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });

  req.headers.token = token;
  next();
};

module.exports = { refreshToken };
