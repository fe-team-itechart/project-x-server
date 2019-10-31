const db = require('../../database');
const errors = require('./errorHandlers/index');
const BaseResponse = require('./response');

const Op = db.sequelize;
const op = db.Sequelize.Op;

const getAllCategories = async () => {
  const data = await db.categories.findAll();
  const response = BaseResponse.responseBuilder({
      status: 200,
      message: 'Success',
      data
  })
  return response;
};

module.exports = {
  getAllCategories,
};
