const nodemailer = require('nodemailer');
const { hashHelpers, jwtHelpers, emailHelpers } = require('../helpers');
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

/**
 * TODO: It needs to think about creating link for reset password
 * @param {*} param0 - object which contents email field
 */

const resetPasswordRequest = async ({ email }) => {
  try {
    let v = await db.Users.findOne({ where: { email } });
    let linkId = v && (await hashHelpers.createHash(email));

    let forgotPassword =
      v &&
      (await db.ForgotPassword.findOrCreate({
        where: { linkId },
        defaults: { UserId: v.id },
      }));
    let linkId2 = encodeURIComponent(linkId);
    const info =
      v && linkId && forgotPassword
        ? await emailHelpers.sendEmail(
            email,
            `Follow link http://localhost:3000/reset?id=${linkId2}`,
            `http://localhost:3000/reset?id=${linkId2}`
          )
        : { message: 'User not founded', status: 400 };
    console.log(nodemailer.getTestMessageUrl(info), 'fdf');
    return info;
  } catch (e) {
    throw new Error(e.toString());
  }
};

const resetPasswordApprove = async ({ linkId }) => {
  try {
    const { UserId } = await db.ForgotPassword.findOne({ where: { linkId } });
    return UserId;
  } catch (e) {
    throw new Error(e.toString());
  }
};

const resetPassword = async ({ password, linkId }) => {
  try {
    const linkId2 = decodeURIComponent(linkId);
    const link = await db.ForgotPassword.findOne({ where: { linkId: linkId2 } });
    const { UserId } = link;
    link.destroy();
    const User = await db.Users.findOne({where: { id: UserId }});
    const newPass = await hashHelpers.createHash(password);
    const user = User.update({
      password: newPass,
    });
    return (user) && {
      status: 200,
      message: 'Password updated'
    };
  } catch (e) {
    throw new Error(e.toString());
  }
};

module.exports = {
  login,
  registration,
  resetPasswordRequest,
  resetPasswordApprove,
  resetPassword
};
