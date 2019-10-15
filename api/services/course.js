const db = require('../../database');
const errors = require('./errorHandlers/index');
const BaseResponse = require('./response');

const Op = db.sequelize;

const getCoursePreview = async id => {
  const course = await db.Courses.findByPk(id, {
    attributes: ['courseName', 'description', 'rating', 'updatedAt'],
  });
  if (!course) throw new errors.NotFoundError('Course not found');

  return course;
};

const getCoursesForCarousel = async () => {
  const course = await db.Courses.findAll({
    attributes: ['id', 'courseName', 'description'],
    order: Op.random(),
    limit: 10,
  });
  if (!course) throw new errors.NotFoundError('Courses not found');

  return BaseResponse.responseBuilder({
    status: 200,
    message: 'Password updated',
    data: course,
  });
};

module.exports = {
  getCoursePreview,
  getCoursesForCarousel,
};
