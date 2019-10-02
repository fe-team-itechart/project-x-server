const { isEmpty } = require('lodash');

const { profileService } = require('../services');

const { publicProfileValidate } = require('../validation/profile');

const getProfile = async (req, res) => {
  const response = await profileService.getProfile(req.headers.authorization);
  res.status(200).send(response);
};

const updateProfile = async (req, res) => {
  const errors = publicProfileValidate(req.body);

  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  const response = await profileService.updateProfile(
    req.headers.authorization,
    req.body
  );
  res.status(200).send(response);
};

module.exports = {
  getProfile,
  updateProfile,
};
