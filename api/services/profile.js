const db = require('../../database');
const errors = require('./errorHandlers/index');
const jwt = require('jsonwebtoken');

const getProfile = async token => {
  const { id } = jwt.decode(token);
  const user = await db.Users.findByPk(id);

  if (!user) {
    throw new errors.UserNotFoundError();
  }

  const { firstName, lastName } = user;
  const {
    description,
    twitterLink,
    linkedInLink,
    facebookLink,
  } = await db.PublicProfiles.findByPk(id);

  const profile = {
    firstName,
    lastName,
    twitterLink,
    linkedInLink,
    facebookLink,
    description,
  };

  return profile;
};

const updateProfile = async req => {
  const { id } = jwt.decode(req.headers.token);
  const user = await db.Users.findByPk(id);

  if (!user) throw new errors.UserNotFoundError();

  const {
    firstName,
    lastName,
    twitterLink,
    linkedInLink,
    facebookLink,
    description,
  } = req.body;

  const transaction = await db.sequelize.transaction();

  try {
    await db.Users.update(
      { firstName, lastName },
      { returning: true, where: { id } },
      { transaction }
    );

    const profile = await db.PublicProfiles.update(
      {
        twitterLink,
        linkedInLink,
        facebookLink,
        description,
      },
      { returning: true, where: { id } },
      { transaction }
    );

    await transaction.commit();

    return profile;
  } catch (err) {
    await transaction.rollback();
    throw new errors.ProfileUpdateFailedError();
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
