const { categoriesService } = require('../services');

const getAllCategories = async (req, res) => {
  const data = await categoriesService.getAllCategories();
  res.json(data);
};

module.exports = {
  getAllCategories,
};
