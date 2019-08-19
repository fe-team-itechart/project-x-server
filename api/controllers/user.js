const services = require('../services/auth');
const {
  loginSchema,
  registrationSchema,
} = require('../validation/user.validation');

const regInDataBaseUser = require('../services/registrationUser');

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
        await regInDataBaseUser(result)
          .then(a => {
            const { password, passwordConfirm, ...results } = result;
            const answ = {
              status: '201',
              message: 'User is created',
              user: {
                ...results,
              },
            };
            res.status(201).send(answ);
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
};
