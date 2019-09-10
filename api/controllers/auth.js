const services = require('../services/auth');

const {
  loginValidate,
  registerValidate,
  changePasswordValidate,
} = require('../validation/auth');

const { isEmpty } = require('lodash');

const login = async (req, res) => {
  const { email, password } = req.body;

  const errorsValidation = loginValidate(email, password);

  if (!isEmpty(errorsValidation)) {
    return res.status(400).json(errorsValidation);
  }

  const response = await services.login(req.body);
  res.send(response);
};

const socialLogin = async (req, res) => {
  const { token } = await services.socialLogin(req.user);
  res.redirect(process.env.CLIENT_HOST + '?token=' + token);
};

const registration = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const errorsValidation = registerValidate(
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  );

  if (!isEmpty(errorsValidation)) {
    return res.status(400).json(errorsValidation);
  }

  const response = await services.registration(req.body);
  res.status(201).send(response);
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
    throw new errors.ResetPasswordError(e.message);
  }
};

const resetApprovementPassword = async (req, res) => {
  try {
    const { linkId } = req.params;

    if (!linkId) {
      throw new error.ResetPasswordApproveError('Empty params');
    }

    const userId = await services.resetPasswordApprove({
      linkId: decodeURIComponent(linkId),
    });

    if (userId) {
      res.status(200).send({
        status: 200,
        message: { content: 'Enter New Password', userId },
      });
    }
  } catch (e) {
    throw new error.ResetPasswordError(e.message);
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

const changePassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  const errors = changePasswordValidate(email, password, confirmPassword);

  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  const response = await services.changePassword(req.body);
  res.send(response);
};

module.exports = {
  login,
  socialLogin,
  registration,
  reset,
  resetApprovementPassword,
  resetPassword,
  changePassword,
};
