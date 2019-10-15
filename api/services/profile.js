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
    userName,
    PublicProfile: {
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
  const user = await db.Users.findByPk(id);

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
    await db.Users.update(
      { userName },
      { returning: true, where: { id } },
      { transaction }
    );

    await db.PublicProfiles.update(
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

    const user = await db.Users.findByPk(id, {
      include: [
        {
          model: db.PublicProfiles,
        },
      ],
    });

    const profile = {
      userName: user.userName,
      twitterLink: user.PublicProfile.twitterLink,
      linkedInLink: user.PublicProfile.linkedInLink,
      facebookLink: user.PublicProfile.facebookLink,
      description: user.PublicProfile.description,
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
