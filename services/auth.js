const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const models = require('../database');

const generateToken = payload => {
  const user = {
    id: payload.id,
    email: payload.email,
  };
  const token = jwt.sign(user, process.env.KEYWORD, {
    expiresIn: process.env.LIFETIME,
  });
  return { token: token };
};

// const validPassword = (password, hash) => {
//   return bcrypt.compareSync(password, hash);
// };

const login = async data => {
  const email = data.email;
  const password = data.password;
  const user = await models.Users.findOne({ where: { email } });
  if (!user) throw Error('User not found.');
  if (data.password !== user.dataValues.password) {
    throw Error('Wrong password.');
  }

  return generateToken(user.dataValues);
};

module.exports = {
  login,
};
