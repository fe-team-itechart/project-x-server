const services = require('../services/auth');
const { loginSchema, registrationSchema } = require('../validation/auth');

const login = async (req, res) => {
  const { errors } = loginSchema.validate(req.body);
  if (errors) {
    res.status(400).json(errors);
  }
  const response = await services.login(req.body);
  res.send(response);
};

const googleLogin = async (req, res) => {
 
  const response = await services.googleLogin(req.body);
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

module.exports = {
  login,
  registration,
  googleLogin
};
