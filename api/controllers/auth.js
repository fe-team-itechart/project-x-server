const services = require('../services/auth');
const { validateAuth } = require('../validation/auth');
const { isEmpty } = require('lodash');

const login = async (req, res) => {
  const errors = validateAuth(req.body);
  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  }
  const response = await services.login(req.body);
  res.send(response);
};

const socialLogin = async (req, res) => {
  const { token } = await services.socialLogin(req.user);
  res.redirect(process.env.CLIENT_HOST + '?token=' + token);
};

const registration = async (req, res) => {
  const errors = validateAuth(req.body);
  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  const response = await services.registration(req.body);
  res.send(response);
};

const changePassword = async (req, res) => {
  const errors = validateAuth(req.body);
  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  const response = await services.changePassword(req.body);
  res.send(response);
};

module.exports = {
  login,
  registration,
  socialLogin,
  changePassword,
};
