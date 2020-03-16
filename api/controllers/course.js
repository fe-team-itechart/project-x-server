const services = require('../services/course');

const getCoursePreview = async (req, res) => {
  const response = await services.getCoursePreview(req.params.courseId);
  res.status(200).send(response);
};

const getCoursesByAttribute = async (req, res) => {
  const { search, limit } = req.query;

  const response = await services.getCoursesByAttribute(search, limit);

  res.status(200).json(response);
};

const getCoursesForCarousel = async (req, res) => {
  const response = await services.getCoursesForCarousel();
  res.status(200).send(response);
};

const subscribeUserToCourse = async (req, res) => {
  const { courseId } = req.params;
  const { authorization } = req.headers;
  const response = await services.subscribeUserToCourse(courseId, authorization);
  res.status(200).send(response);
};

const getSubscriptionUserToCourse = async (req, res) => {
  const { courseId } = req.params;
  const { authorization } = req.headers;
  const response = await services.getSubscriptionUserToCourse(courseId, authorization);
  res.status(200).send(response);
};

module.exports = {
  getCoursePreview,
  getCoursesByAttribute,
  getCoursesForCarousel,
  subscribeUserToCourse,
  getSubscriptionUserToCourse
};
