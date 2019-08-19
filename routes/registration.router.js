const express = require('express');
const router = express.Router();
const schema = require('../validation/registration.validation');
const regInDataBaseUser = require('../services/registrationUser');

router.post('/registration', (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  try {
    const validateObj = {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    };
    schema.validate(validateObj, async function(err, result) {
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
});

module.exports = router;
