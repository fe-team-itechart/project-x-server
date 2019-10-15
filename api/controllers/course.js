const services = require('../services/course');

// const getCoursePreview = async (req, res) => {
//   const response = await services.getCoursePreview(req.params.courseId);
//   res.status(200).send(response);
// };

const getCoursePreview = async (req, res) => {
  const response = await services.getCoursePreview(req.params.courseId);
  res.status(200).send(response);
};

module.exports = {
  getCoursePreview,
};
