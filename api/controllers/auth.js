const services = require('../services/auth');
const {
  loginSchema,
  registrationSchema,
  emailSchema,
  passwordSchema,
} = require('../validation/auth');

const login = async (req, res) => {
  const { errors } = loginSchema.validate(req.body);
  if (errors) {
    res.status(400).json(errors);
  }
  const response = await services.login(req.body);
  res.send(response);
};

const registration = async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  try {
    const validateObj = {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    };
    registrationSchema.validate(validateObj, async function(err, result) {
      if (!err) {
        await services
          .registration(result)
          .then(async () => {
            const { password, passwordConfirm, email, ...results } = result;
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
      } else {
        let errMessage = '';
        err.details.forEach(error => {
          errMessage += ` ${error.message}`;
        });
        next(new Error(errMessage));
      }
    });
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

module.exports = {
  login,
  registration,
  reset,
  resetApprovementPassword,
  resetPassword
};
