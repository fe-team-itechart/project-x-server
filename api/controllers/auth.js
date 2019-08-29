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
  const response = await services.socialLogin(req.user);
  res.redirect(process.env.CLIENT_HOST + '?token=' + response);
};

const registration = async (req, res, next) => {
  try {
    const errors = validateAuth(req.body);

    if (!isEmpty(errors)) {
      return res.status(400).json(errors);
    }

    await services
      .registration(req.body)
      .then(async () => {
        const { password, passwordConfirm, email, ...results } = req.body;
        const { token } = await services.login({
          email,
          password,
        });
        const response = {
          status: '201',
          message: 'User is created',
          user: {
            email,
            ...results,
          },
          token,
        };
        res.status(201).send(response);
      })
      .catch(err => next(err.toString()));
  } catch (err) {
    next(err.toString());
  }
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
