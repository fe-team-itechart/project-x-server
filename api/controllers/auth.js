const services = require('../services/auth');
const {
  loginSchema,
  registrationSchema,
  emailSchema,
  passwordsSchema,
  validateAuth,
} = require('../validation/auth');
const { isEmpty } = require('lodash');
const errors = require('../services/errorHandlers');

const login = async (req, res) => {
  const errorsValidation = validateAuth(req.body);
  if (!isEmpty(errorsValidation)) {
    return res.status(400).json(errorsValidation);
  }
  const response = await services.login(req.body);
  res.send(response);
};

const socialLogin = async (req, res) => {
  const response = await services.registration(req.user);
  res.redirect(process.env.CLIENT_HOST + '?token=' + response);
};

const registration = async (req, res) => {
  const errors = validateAuth(req.body)
  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  const response = await services.registration(req.body)
  res.send(response)
};

const reset = async (req, res) => {
  const { email } = req.body;
  try {
    const validation = await emailSchema.validate({ email });
    const answer =
      validation && (await services.resetPasswordRequest({ email }));
    const status = answer.status ? answer.status : 200;
    const response = answer.messageId ? 'Mail was sent' : answer.message;
    res.status(status).send(response);
  } catch (e) {
    throw new errors.ResetPasswordRequestError(e.message);
  }
};

const resetApprovementPassword = async (req, res) => {
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
    throw new error.ResetPasswordApproveError(e.message);
  }
};

const resetPassword = async (req, res) => {
  const { linkId, password, passwordConfirm } = req.body;
  if (!linkId || !password || !passwordConfirm) {
    throw new errors.ResetPasswordError('Empty params');
  }
  try {
    const validation = await passwordsSchema.validate({
      password,
      passwordConfirm,
    });
    const answer =
      validation && (await services.resetPassword({ password, linkId }));
    res.status(200).send(answer);
  } catch (e) {
    throw new errors.ResetPasswordError(e.message);
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
  socialLogin,
  changePassword,
};
