const nodemailer = require('nodemailer');

const { hashHelpers, jwtHelpers, emailHelpers } = require('../helpers');
const errors = require('./errorHandlers/index');
const db = require('../../database');
const jwt = require('jsonwebtoken');

const HOST = process.env.CLIENT_HOST || 'http://localhost:3000';

const login = async ({ email, password }) => {
  const user = await db.Users.findOne({ where: { email } });
  if (!user) {
    throw new errors.UserNotFoundError();
  }

  if (password && !hashHelpers.validPassword(password, user.password)) {
    throw new errors.WrongPasswordError();
  }

  return jwtHelpers.generateToken(user.dataValues);
};

const socialLogin = async ({ firstName, lastName, email, password }) => {
  const user = await db.Users.findOne({ where: { email } });
  if (user) {
    return login({ email, password });
  } else {
    return registration({ firstName, lastName, email, password });
  }
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

const forgotPassword = async ({ email }) => {
  try {
    const user = await db.Users.findOne({ where: { email } });
    if (user) {
      const { id } = user;
      let { token } = await jwtHelpers.generateToken({ id, email });
      const info = await emailHelpers.sendEmail(
        email,
        `Follow link ${HOST}/reset?id=${token}`,
        `${HOST}/reset?id=${token}`
      );
      if (info.rejected.length === 0) {
        await db.Users.update({
          refreshTokenForgotPassword: token
        }, {
          where: { email }
        });
      }
      console.log(nodemailer.getTestMessageUrl(info), ' ');
      return info;
    }
    throw new errors.UserNotFoundError();
  } catch (e) {
    throw new errors.ResetPasswordError(e.message);
  }
};

/**
 * TODO: It needs to use Transactions
 * @param {*} param0
 */

const resetPassword = async ({ password, token }) => {
  try {
      const User = await db.Users.findOne({ where: { refreshTokenForgotPassword: token } });
      if (!User) {
        throw new errors.UserNotFoundError();
      }
      const newPass = await hashHelpers.createHash(password);
      const user = User && User.update({
        password: newPass,
        refreshTokenForgotPassword: null
      });
      if ( user ) {
        return {
          status: 200,
          message: 'Password updated',
        };
      } 
      throw new errors.ResetPasswordError();
  } catch (e) {
    throw new errors.ResetPasswordError(e.message);
  }
};

const changePassword = async (authorization, password) => {
  const { id } = jwt.decode(authorization);
  const newPassword = await hashHelpers.createHash(password);
  const user = await db.Users.findByPk(id);

  if (!user) throw new errors.UserNotFoundError();

  await db.Users.update(
    { password: newPassword },
    { returning: true, where: { id } }
  );

  return user;
};

module.exports = {
  login,
  socialLogin,
  registration,
  forgotPassword,
  resetPassword,
  changePassword,
};
