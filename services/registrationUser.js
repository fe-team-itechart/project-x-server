const db = require('../database');
const bcrypt = require('bcryptjs');
const ErrorHandler = require('../services/error.handler');

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

module.exports = async function regInDataBaseUser({
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
};
