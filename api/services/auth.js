const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../database');
const ErrorHandler = require('../services/error.handler');

const models = require('../../database');

const generateToken = payload => {
  const user = {
    email: payload.email,
  };
  const token = jwt.sign(user, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
  return { token: token };
};

const validPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const login = async data => {
  const email = data.email;
  const password = data.password;
  const user = await models.Users.findOne({ where: { email } });
  if (!user) throw Error('User not found.');
  if (!validPassword(password, user.password)) {
    throw Error('Wrong password.');
  }

  return generateToken(user.dataValues);
};

const googleLogin = async data => {
  if (data) {
    const payload = {
      firstName: data.payload.profileObj.givenName,
      lastName: data.payload.profileObj.familyName,
      email: data.payload.profileObj.email,
    };
    new Promise(async (resolve, reject) => {
      let userId = null;
      await db.Users.findOrCreate({
        where: {
          email: payload.email,
        },
      }).then(([user, created]) => {
        if (created) {
          userId = user.id;
        }
      });
      let PublicProfileId = null;
      if (userId) {
        await db.PublicProfiles.findOrCreate({
          where: {
            id: userId,
          },
          defaults: {
            firstName: payload.firstName,
            lastName: payload.lastName,
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
        if (
          userId &&
          PublicProfileId &&
          AccountProfileId &&
          SettingsProfileId
        ) {
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
        } else {
          resolve({});
        }
      }
    });
    return generateToken(payload)
  }
};
module.exports = {
  login,
  googleLogin,
};
