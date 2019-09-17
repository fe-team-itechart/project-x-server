const jwt = require('jsonwebtoken');

const refreshToken = (req, res, next) => {
  let decodedToken = jwt.decode(req.headers.token);
  const user = {
    id: decodedToken.id,
    name: decodedToken.email,
    expiresIn: process.env.EXPIRES_IN,
  };
  const token = jwt.sign(user, process.env.SECRET);
  req.headers.token = token;
  next();
};

module.exports = { refreshToken };
