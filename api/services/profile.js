const db = require('../../database');
const errors = require('./errorHandlers/index');
const jwt = require('jsonwebtoken');

const getProfile = async authorization => {
  const { id } = jwt.decode(authorization);
  const user = await db.Users.findByPk(id, {
    include: [
      {
        model: db.PublicProfiles,
      },
    ],
  });

  if (!user) {
    throw new errors.UserNotFoundError();
  }

  const {
    firstName,
    lastName,
    PublicProfile: {
      dataValues: { twitterLink, linkedInLink, facebookLink, description },
    },
  } = user;

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
  const { id } = jwt.decode(req.headers.authorization);
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
