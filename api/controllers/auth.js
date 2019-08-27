const services = require('../services/auth');
const {
  loginSchema,
  registrationSchema,
  emailSchema,
  passwordSchema,
  validateAuth
} = require('../validation/auth');
const { isEmpty } = require('lodash');
const errors = require('../services/errorHandlers');

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
    const validation = await emailSchema.validate({ email });
    const answer = validation && (await services.resetPasswordRequest({ email }));
    let status = answer.status ? answer.status : 200;
    let response = answer.messageId ? 'Mail was sent' : answer.message;
    res.status(status).send(response);
  } catch (e) {
    next(new errors.ResetPasswordRequestError(e.message));
  }
};

const resetApprovementPassword = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    if (!linkId) {
      throw new error.ResetPasswordApproveError('Empty params');
    }
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
  if ((!linkId) || (!password) || (!passwordConfirm)) {
    let e = new errors.ResetPasswordError('Empty params');
    next(e);
  }
  if ((linkId) && (password) && (passwordConfirm)) {
    try {
      const validation = await passwordSchema.validate({ password, passwordConfirm });
      const answer = validation && (await services.resetPassword({ password, linkId }));
      res.status(200).send(answer);
    } catch (e) {
      next(new errors.ResetPasswordError(e.message));
    }
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
