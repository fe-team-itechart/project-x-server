const { hashHelpers, jwtHelpers } = require('../helpers');
const { ErrorHandler } = require('../middlewares/errorHandler');
const db = require('../../database');

const login = async ({ email, password }) => {
  const user = await db.Users.findOne({ where: { email } });
  if (!user) throw Error('User not found.');
  if (!hashHelpers.validPassword(password, user.password)) {
    throw Error('Wrong password.');
  }
  return jwtHelpers.generateToken(user.dataValues);
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
/**
 * TODO: It needs to rebuild process of creating user Instance with Transactions
 *  https://sequelize.org/master/manual/transactions.html
 */

async function registration({ firstName, lastName, email, password }) {
  const newPass = await hashHelpers.createHash(password);
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

module.exports = {
  login,
  registration,
  googleLogin,
};
