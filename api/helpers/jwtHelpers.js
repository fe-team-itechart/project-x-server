const jwt = require('jsonwebtoken');

const generateToken = ({ id, email }) => {
  const token = jwt.sign({ id, email }, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
  return token;
};

const decodeToken = token => {
  return jwt.decode(token);
};
module.exports = {
  generateToken,
  decodeToken,
};
