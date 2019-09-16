const db = require('../../database');
const errors = require('./errorHandlers/index');
const jwt_decode = require('jwt-decode');

const getProfile = async token => {
  const { id } = jwt_decode(token);
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
  const { id } = jwt_decode(req.headers.token);
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

  await db.Users.update(
    { firstName, lastName },
    { returning: true, where: { id } }
  );

  const profile = await db.PublicProfiles.update(
    {
      twitterLink,
      linkedInLink,
      facebookLink,
      description,
    },
    { returning: true, where: { id } }
  );

  return profile;
};

module.exports = {
  getProfile,
  updateProfile,
};
