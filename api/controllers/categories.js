const { categoriesService } = require('../services');

const getAllCategories = async (req, res) => {
  const data = await categoriesService.getAllCategories();
  res.status(200).json(data);
};

module.exports = {
  getAllCategories,
};
