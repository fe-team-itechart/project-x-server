//refresh token
const jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken');

const refreshAccessToken = (req, res, next) => {
  let decodedToken = jwtDecode(req.headers.authorization);
  const user = {
    id: decodedToken.sub,
    name: decodedToken.name,
    expiresIn: 11111,
  };
  const token = jwt.sign(user, process.env.KEYWORD);
  req.headers.authorization = token;
  next();
};

module.exports = {
  refreshAccessToken,
};
