const db = require('../../database');
const errors = require('./errorHandlers/index');
const Op = db.sequelize;

const getCoursePreview = async id => {
  const course = await db.Courses.findByPk(id, {
    attributes: [
      'title',
      'description',
      'numberOfLessons',
      'rating',
      'updatedAt',
    ],
  });
  if (!course) throw new errors.NotFoundError('Course not found');

  return course;
};

const getCoursesForCarousel = async id => {
  const course = await db.Courses.findAll({
    attributes: ['id', 'title', 'description', 'numberOfLessons'],
    order: Op.random(),
    limit: 10,
  });
  if (!course) throw new errors.NotFoundError('Courses not found');

  return course;
};

module.exports = {
  getCoursePreview,
  getCoursesForCarousel,
};
