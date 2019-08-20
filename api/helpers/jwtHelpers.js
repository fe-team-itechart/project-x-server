const jwt = require('jsonwebtoken');

const generateToken = payload => {
  const user = {
    id: payload.id,
    email: payload.email,
  };
  const token = jwt.sign(user, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
  return { token: token };
};

module.exports = {
  generateToken,
};
