const db = require('../../database');
const errors = require('./errorHandlers/index');
const BaseResponse = require('./response');

const Op = db.sequelize;
const op = db.Sequelize.Op;

const getCoursePreview = async id => {
  const course = await db.courses.findByPk(id, {
    attributes: [
      'id',
      'courseName',
      'description',
      'rating',
      'numberOfEnrolledStudents',
      'authors',
      'language',
      'createdAt',
      'updatedAt',
    ],
    include: [
      {
        model: db.courseReviews,
        attributes: ['id', 'rating', 'text', 'createdAt', 'updatedAt'],
      },
      {
        model: db.profits,
        attributes: ['id', 'description'],
      },
    ],
  });

  if (!course) throw new errors.NotFoundError('Course not found');

  return course;
};

const getCoursesByAttribute = async (search, limit) => {
  const numberOfCourses = Number(limit) ? limit : 10;

  const courses = await db.courses.findAll({
    where: {
      [op.or]: [
        { courseName: { [op.iLike]: '%' + search + '%' } },
        { description: { [op.iLike]: '%' + search + '%' } },
        { authors: { [op.iLike]: '%' + search + '%' } },
      ],
    },
    attributes: ['id', 'courseName', 'description', 'authors', 'rating'],
    limit: numberOfCourses,
  });

  return BaseResponse.responseBuilder({
    status: 200,
    message: 'Success',
    data: courses,
  });
};

const getCoursesForCarousel = async () => {
  const course = await db.courses.findAll({
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
  getCoursesByAttribute,
  getCoursesForCarousel,
};
