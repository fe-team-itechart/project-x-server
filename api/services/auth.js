const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const { hashHelpers, jwtHelpers, emailHelpers } = require('../helpers');
const errors = require('./errorHandlers/index');
const db = require('../../database');
const BaseResponse = require('./response');

const HOST = process.env.CLIENT_HOST || 'http://localhost:3000';

const login = async ({ email, password }) => {
  const user = await db.users.findOne({ where: { email } });
  if (!user) {
    throw new errors.NotFoundError('User not found');
  }

  if (password && !hashHelpers.validPassword(password, user.password)) {
    throw new errors.WrongPasswordError();
  }

  return jwtHelpers.generateToken(user.dataValues);
};

const socialLogin = async ({ email, password, userName }) => {
  const user = await db.users.findOne({ where: { email } });
  if (user) {
    return login({ email, password });
  } else {
    return registration({ userName, email, password });
  }
};

const registration = async ({ userName, email, password }) => {
  const user = await db.users.findOne({ where: { email } });

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
        userName,
      };
      createdUser = await db.users.create(newUser, { transaction });
    } else {
      const socialUser = {
        email,
        password: null,
        userName,
      };
      createdUser = await db.users.create(socialUser, { transaction });
    }
    const createdUserId = createdUser.dataValues.id;

    const newProfile = await db.publicProfiles.create(
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
    const user = await db.users.findOne({ where: { email } });
    if (user) {
      const { id } = user;
      let { token } = await jwtHelpers.generateToken({ id, email });
      const dataEmailing = await emailHelpers.sendEmail(
        email,
        `Follow link ${HOST}/reset?id=${token}`,
        `${HOST}/reset?id=${token}`
      );
      await db.users.update(
        {
          resetPasswordToken: token,
        },
        {
          where: { email },
        }
      );
      return dataEmailing;
    }
    throw new errors.NotFoundError('User not found');
  } catch (e) {
    throw new errors.ResetPasswordError(e.message);
  }
};

const resetPassword = async ({ password, token }) => {
  try {
    const User = await db.users.findOne({
      where: { resetPasswordToken: token },
    });

    if (!User) {
      throw new errors.UserNotFoundError();
    }

    const newPass = await hashHelpers.createHash(password);
    const user = User.update({
      password: newPass,
      resetPasswordToken: null,
    });
    
    if (user) {
      return BaseResponse.responseBuilder({
        status: 200,
        message: 'Password updated',
      });
    }
    throw new errors.ResetPasswordError();
  } catch (e) {
    throw new errors.ResetPasswordError(e.message);
  }
};

const changePassword = async (authorization, password) => {
  const { id } = jwt.decode(authorization);
  const newPassword = await hashHelpers.createHash(password);
  const user = await db.users.findByPk(id);

  if (!user) throw new errors.NotFoundError('User not found');

  await db.users.update(
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
