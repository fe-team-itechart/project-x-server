const db = require('../../database');
const errors = require('./errorHandlers/index');
const jwt = require('jsonwebtoken');

const getProfile = async authorization => {
  const { id } = jwt.decode(authorization);
  const user = await db.users.findByPk(id, {
    include: [
      {
        model: db.publicProfiles,
      },
    ],
  });

  if (!user) {
    throw new errors.UserNotFoundError();
  }

  const {
    userName,
    publicProfile: {
      dataValues: { twitterLink, linkedInLink, facebookLink, description },
    },
  } = user;

  const profile = {
    userName,
    twitterLink,
    linkedInLink,
    facebookLink,
    description,
  };

  return profile;
};

const updateProfile = async (authorization, data) => {
  const { id } = jwt.decode(authorization);
  const user = await db.users.findByPk(id);

  if (!user) throw new errors.UserNotFoundError();

  const {
    userName,
    twitterLink,
    linkedInLink,
    facebookLink,
    description,
  } = data;

  const transaction = await db.sequelize.transaction();

  try {
    await db.users.update(
      { userName },
      { returning: true, where: { id } },
      { transaction }
    );

    await db.publicProfiles.update(
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

    const user = await db.users.findByPk(id, {
      include: [
        {
          model: db.publicProfiles,
        },
      ],
    });

    const profile = {
      userName: user.userName,
      twitterLink: user.publicProfile.twitterLink,
      linkedInLink: user.publicProfile.linkedInLink,
      facebookLink: user.publicProfile.facebookLink,
      description: user.publicProfile.description,
    };

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
