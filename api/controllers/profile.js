const { isEmpty } = require('lodash');

const services = require('../services/profile');

const { publicProfileValidate } = require('../validation/profile');

const getProfile = async (req, res) => {
  const response = await services.getProfile(req.headers.security);
  res.status(200).send(response);
};

const updateProfile = async (req, res) => {
  const errors = publicProfileValidate(req.body);

  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  const response = await services.updateProfile(req);
  res.status(200).send(response);
};

module.exports = {
  getProfile,
  updateProfile,
};
