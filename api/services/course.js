const db = require('../../database');
const errors = require('./errorHandlers/index');

const getCoursePreview = async id => {
  const course = await db.courses.findByPk(id, {
    include: [
      {
        model: db.courseReviews,
      },
      {
        model: db.profits
      }
    ],
  });

  if (!course) throw new errors.NotFoundError('Course not found');

  return course;
};

module.exports = {
  getCoursePreview,
};
