const { authService } = require('../services');

const BaseResponse = require('../services/response');

const {
  loginValidate,
  registerValidate,
  passwordSchema,
  emailSchema,
  passwordConfirmSchema,
} = require('../validation/auth');

const { isEmpty } = require('lodash');
const errors = require('../services/errorHandlers');

const login = async (req, res) => {
  const { email, password } = req.body;

  const errors = loginValidate(email, password);

  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  const response = await authService.login(req.body);
  res.send(response);
};

const socialLogin = async (req, res) => {
  const { token } = await authService.socialLogin(req.user);
  res.redirect(process.env.CLIENT_HOST + '?token=' + token);
};

const registration = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const errors = registerValidate(
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  );

  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  const response = await authService.registration(req.body);
  res.status(201).send(response);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await emailSchema.validate(email);
    const dataEmailing = await authService.forgotPassword({ email });
    const response = BaseResponse.responseBuilder({
      message: 'Mail sent',
      data: dataEmailing,
    });
    res.status(200).send(response);
  } catch (e) {
    throw new errors.ResetPasswordError(e.message);
  }
};

const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const token = req.headers.authorization;

  try {
    await passwordConfirmSchema.validate({
      password,
      confirmPassword,
    });
    const response = await authService.resetPassword({ password, token });
    res.status(200).send(response);
  } catch (e) {
    throw new errors.ResetPasswordError(e.message);
  }
};

const changePassword = async (req, res) => {
  const { error } = passwordSchema.validate(req.body.password);

  if (!isEmpty(error)) {
    return res.status(400).json(error.message);
  }

  const response = await authService.changePassword(
    req.headers.authorization,
    req.body.password
  );
  res.status(200).send(response);
};

module.exports = {
  login,
  socialLogin,
  registration,
  forgotPassword,
  resetPassword,
  socialLogin,
  changePassword,
};
