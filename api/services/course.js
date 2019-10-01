const db = require('../../database');
const errors = require('./errorHandlers/index');

const getCoursePreview = async id => {
  const Course = await db.Courses.findByPk(id, {
    attributes: [
      'title',
      'description',
      'numberOfLessons',
      'rating',
      'updatedAt',
    ],
  });
  if (!Course) throw new errors.NotFoundError('Course not found');

  return Course;
};

module.exports = {
  getCoursePreview,
};
