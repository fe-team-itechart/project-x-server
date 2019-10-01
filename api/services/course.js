const db = require('../../database');
const errors = require('./errorHandlers/index');

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

module.exports = {
  getCoursePreview,
};
