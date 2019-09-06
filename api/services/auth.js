const nodemailer = require('nodemailer');
const { hashHelpers, jwtHelpers, emailHelpers } = require('../helpers');
const { ErrorHandler } = require('../middlewares/errorHandler');
const {
  ResetPasswordApproveError,
  ResetPasswordError,
} = require('./errorHandlers/index');

const errors = require('./errorHandlers/index');
const db = require('../../database');

const HOST = process.env.CL_HOST || 'http://localhost:3000';

const login = async ({ email, password }) => {
  const user = await db.Users.findOne({ where: { email } });
  if (!user) {
    throw new errors.UserNotFoundError();
  }

  if (!hashHelpers.validPassword(password, user.password)) {
    throw new errors.WrongPasswordError();
  }

  return jwtHelpers.generateToken(user.dataValues);
};

const registration = async ({ firstName, lastName, email, password }) => {
  const user = await db.Users.findOne({ where: { email } });
  if (user) {
    throw new errors.UserAlreadyExistsError();
  }

  const transaction = await db.sequelize.transaction();

  try {
    if (password) {
      const hashedPassword = await hashHelpers.createHash(password);
      const newUser = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      };
      createdUser = await db.Users.create(newUser, { transaction });
    } else {
      const socialUser = {
        email,
        password: null,
      };
      createdUser = await db.Users.create(socialUser, { transaction });
    }
    const createdUserId = createdUser.dataValues.id;

    const newProfile = await db.PublicProfiles.create(
      { id: createdUserId },
      { transaction }
    );

    const newSettings = await db.SettsProfiles.create(
      { id: createdUserId },
      { transaction }
    );

    await transaction.commit();

    return jwtHelpers.generateToken({ id: createdUserId, email });
  } catch (err) {
    await transaction.rollback();
    throw new errors.RegistrationFailedError();
  }
};

/**
 * TODO: It needs to think about creating link for reset password
 * @param {*} param0 - object which contents email field
 */

const resetPasswordRequest = async ({ email }) => {
  try {
    const user = await db.Users.findOne({ where: { email } });
    if (user) {
      let linkId = await hashHelpers.createHash(email);
      const forgotPassword = await db.ForgotPassword.findOrCreate({
        where: { linkId },
        defaults: { UserId: user.id },
      });
      linkId = encodeURIComponent(linkId);
      const info =
        linkId &&
        forgotPassword &&
        (await emailHelpers.sendEmail(
          email,
          `Follow link ${HOST}/reset?id=${linkId}`,
          `${HOST}/reset?id=${linkId}`
        ));
      console.log(nodemailer.getTestMessageUrl(info), ' ');
      return info;
    }
    throw new errors.UserNotFoundError();
  } catch (e) {
    throw new Error(e.message);
  }
};

const resetPasswordApprove = async ({ linkId }) => {
  try {
    const { UserId } = await db.ForgotPassword.findOne({ where: { linkId } });
    return UserId;
  } catch (e) {
    throw new ResetPasswordApproveError();
  }
};

/**
 * TODO: It needs to use Transactions
 * @param {*} param0
 */

const resetPassword = async ({ password, linkId }) => {
  try {
    const linkIdDecoded = decodeURIComponent(linkId);
    const link = await db.ForgotPassword.findOne({
      where: { linkId: linkIdDecoded },
    });
    if (link) {
      const { UserId } = link;
      link.destroy();
      const User = await db.Users.findOne({ where: { id: UserId } });
      const newPass = await hashHelpers.createHash(password);
      const user = User.update({
        password: newPass,
      });
      return (
        user && {
          status: 200,
          message: 'Password updated',
        }
      );
    }
    if (!link) {
      throw new ResetPasswordError();
    }
  } catch (e) {
    throw new ResetPasswordError(e.message);
  }
};

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
  resetPasswordRequest,
  resetPasswordApprove,
  resetPassword,
  changePassword,
};
