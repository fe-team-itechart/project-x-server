const services = require('../services/auth');
const {
  loginSchema,
  registrationSchema,
  emailSchema,
  passwordSchema,
} = require('../validation/auth');
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

const reset = async (req, res, next) => {
  const { email } = req.body;
  try {
    const v = await emailSchema.validate({ email });
    const a = v && (await services.resetPasswordRequest({ email }));
    let status = a.status ? a.status : 200;
    let response = a.messageId ? 'Mail was sent' : a.message;
    res.status(status).send(response);
  } catch (e) {
    next(e);
  }
  //
};

const resetApprovementPassword = async (req, res, next) => {
  const { linkId } = req.params;
  try {
    const UserId = await services.resetPasswordApprove({
      linkId: decodeURIComponent(linkId),
    });
    if (UserId) {
      res.status(200).send({
        status: 200,
        message: { content: 'Enter New Password', UserId },
      });
    }
  } catch (e) {
    next(e);
  }
};

const resetPassword = async (req, res, next) => {
  const { linkId, password, passwordConfirm } = req.body;
  try {
    const v = await passwordSchema.validate({ password, passwordConfirm });
    const a = v && (await services.resetPassword({ password, linkId }));
    res.status(200).send(a);
  } catch (e) {
    next(e);
  }
};

const googleLogin = async (req, res) => {
  const response = await services.googleLogin(req.body);
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
  reset,
  resetApprovementPassword,
  resetPassword,
  googleLogin,
  changePassword,
}
