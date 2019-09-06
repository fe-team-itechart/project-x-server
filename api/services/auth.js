const { hashHelpers, jwtHelpers } = require('../helpers');
const errors = require('./errorHandlers/index');
const db = require('../../database');

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

const changePassword = async ({ email, password }) => {
  const user = await db.Users.findOne({ where: { email } });
  if (!user) {
    throw new errors.UserNotFoundError();
  }

  const newPassword = await hashHelpers.createHash(password);
  await db.Users.update(
    { password: newPassword },
    { returning: true, where: { email } }
  );

  return user;
};

module.exports = {
  login,
  socialLogin,
  registration,
  changePassword,
};
