const services = require('../services/auth');
const loginSchema = require('../validation/loginSchema');

const login = async (req, res) => {
  const { errors, val } = loginSchema.validate(req.body);
  if (errors) {
    res.status(400).json(errors);
  }
  const response = await services.login(req.body);
  res.send(response);
};

module.exports = {
  login,
};
