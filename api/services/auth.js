const { hashHelpers, jwtHelpers } = require('../helpers');
const { ErrorHandler } = require('../middlewares/errorHandler');
const errors = require('./errorHandlers/index');
const db = require('../../database');

const login = async ({ email, password }) => {
  const user = await db.Users.findOne({ where: { email } });
  if (!user) throw new errors.UserNotFoundError();
  if (!hashHelpers.validPassword(password, user.password)) {
    throw new errors.WrongPasswordError();
  }
  return jwtHelpers.generateToken(user.dataValues);
};

const socialLogin = async data => {
  registration(data);
  return jwtHelpers.generateToken(data);
};

/**
 * TODO: It needs to rebuild process of creating user Instance with Transactions
 *  https://sequelize.org/master/manual/transactions.htmlF
 */

async function registration({ firstName, lastName, email, password }) {
  let newPass;
  return new Promise(async (resolve, reject) => {
    let userId = null;
    if (password) {
      newPass = await hashHelpers.createHash(password);
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
    } else {
      await db.Users.findOrCreate({
        where: {
          email,
        },
      }).then(([user, created]) => {
        if (created) {
          userId = user.id;
        }
      });
    }
    let PublicProfileId = null;
    if (userId) {
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
      if (userId && PublicProfileId && AccountProfileId && SettingsProfileId) {
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
}

const changePassword = async ({ email, password }) => {
  const newPassword = await hashHelpers.createHash(password);
  const user = await db.Users.findOne({ where: { email } });
  if (!user) throw Error('User not found.');
  await db.Users.update(
    { password: newPassword },
    { returning: true, where: { email } }
  );
  return user;
};

module.exports = {
  login,
  registration,
  socialLogin,
  changePassword,
};
