const jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken');

const refreshAccessToken = (req, res, next) => {
  let decodedToken = jwtDecode(req.headers.authorization);
  const user = {
    id: decodedToken.sub,
    name: decodedToken.name,
    expiresIn: process.env.EXPIRES_IN,
  };
  const token = jwt.sign(user, process.env.SECRET);
  req.headers.authorization = token;
  next();
};

module.exports = {
  refreshAccessToken,
};
