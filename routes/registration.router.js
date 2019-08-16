const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const router = express.Router();
const ErrorHandler = require('../services/error.handler');

const db = require('../database');

function createHash(pass) {
  return new Promise(resolve => {
    bcrypt.genSalt(10, async (err, salt) => {
      if (!err) {
        bcrypt.hash(pass, salt, async (err, hash) => {
          if (!err) {
            resolve(hash);
          }
        });
      }
    });
  });
}

async function regInDataBaseUser({
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
}) {
  let newPass = await createHash(password);
  return new Promise(async (resolve, reject) => {
    let userId = null;
    await db.Users.findOrCreate({
      where: {
        email,
      },
      defaults: {
        password: newPass,
      },
    }).then(([user, created]) => {
      if (created) {
        userId = user.id;
      } else {
        reject(`Already exist ${user.email}`);
      }
    });
    let PublicProfileId = null;
    await db.PublicProfiles.findOrCreate({
      where: {
        id: userId,
      },
      defaults: {
        firstName,
        lastName,
      },
    })
      .then(([profile, created]) => {
        PublicProfileId = profile.id;
        ErrorHandler(profile);
      })
      .catch(e => ErrorHandler(e, { show: false }));

    let AccountProfileId = null;
    await db.AccountProfiles.findOrCreate({
      where: {
        id: userId,
      },
      defaults: {
        info: {},
      },
    })
      .then(([profile, created]) => {
        AccountProfileId = created ? profile.id : null;
        ErrorHandler(profile);
      })
      .catch(e => ErrorHandler(e, { show: true }));

    let SettingsProfileId = null;
    await db.SettingsProfiles.findOrCreate({
      where: {
        id: userId,
      },
      defaults: {
        localization: 'ru',
        secureSetts: {},
      },
    })
      .then(([profile, created]) => {
        SettingsProfileId = created ? profile.id : null;
        ErrorHandler(profile);
      })
      .catch(e => ErrorHandler(e, { show: true }));

    await db.Profiles.findOrCreate({
      where: {
        userId,
        PublicProfileId,
        AccountProfileId,
        SettingsProfileId,
      },
    })
      .then(([profile, created]) => {
        resolve(profile);
        ErrorHandler(profile);
      })
      .catch(e => ErrorHandler(e, { show: true }));
    resolve();
  });
}

router.post('/', (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  try {
    const schema = Joi.object().keys({
      firstName: Joi.string()
        .min(1)
        .max(20)
        .required(),
      lastName: Joi.string()
        .min(1)
        .max(20)
        .required(),
      email: Joi.string()
        .max(64)
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .min(8)
        .max(32)
        .regex(/^[a-zA-Z0-9!@#$%^&*?]/)
        .required(),
      passwordConfirm: Joi.ref('password'),
    });
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
            const {password, passwordConfirm, ...result} = result;
            const answ = {status: '201', message: 'User is created', user: {
              ...result
            }}
            res.status(201).send(answ);
          })
          .catch(err => next(err.toString()));
      } else {
        let errMessage = '';
        err.details.forEach(error => {
          errMessage += ` ${error.message}`;
        });
        throw new Error(errMessage);
      }
    });
  } catch (err) {
    next(err.toString());
  }
});

module.exports = router;
