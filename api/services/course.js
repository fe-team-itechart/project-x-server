const jwtDecode = require('jwt-decode');

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
      'price',
      'numberOfEnrolledStudents',
      'authors',
      'language',
      'createdAt',
      'updatedAt',
    ],
    include: [
      {
        model: db.courseReviews,
        attributes: ['id', 'rating', 'text', 'createdAt', 'updatedAt', 'userId'],
        include: [{
          model: db.users,
          attributes: ['userName']
        }]
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

  const query = `select courses.id as id, courses."courseName" as courseName, courses.description as description, courses.rating as rating, courses.authors as authors, array_agg(c.title) as categories
  from courses
      inner join courses_categories cc on courses.id = cc."courseId"
      inner join categories c on cc."categoryId" = c.id
  where
  c.title ILIKE '%${search}%'
  or
  courses."courseName" ILIKE '%${search}%'
  or
  courses.description ILIKE '%${search}%'
  or
  courses.authors ILIKE '%${search}%'
  
  group by courses.id
  limit '${numberOfCourses}'`;

  const courses = await db.sequelize.query(query, {
    type: db.sequelize.QueryTypes.SELECT,
  });

  return BaseResponse.responseBuilder({
    status: 200,
    message: 'Success',
    data: courses,
  });
};

const getCoursesForCarousel = async () => {
  const course = await db.courses.findAll({
    attributes: ['id', 'courseName', 'rating', 'authors', 'price'],
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

const subscribeUserToCourse = async (courseId, authorization) => {
  const course = await db.courses.findByPk(courseId);

  if (!course) {
    throw new errors.SubscribeUserToCourseError('Such course isn\'t exist', 404);
  }
  
  const { id: userId } = jwtDecode(authorization);
  const [subscribe, created] = await db.usersCourses.findOrCreate({
    where: {
      userId,
      courseId,
    },
  });

  if (!created)
    throw new errors.SubscribeUserToCourseError('User has already signed');

  return BaseResponse.responseBuilder({
    status: 201,
    message: 'User have signatured',
    data: subscribe,
  });
};

const getSubscriptionUserToCourse = async (courseId, authorization) => {
  const course = await db.courses.findByPk(courseId);

  if (!course) {
    throw new errors.SubscribeUserToCourseError('Such course isn\'t exist', 404);
  }

  const { id: userId } = jwtDecode(authorization);

  const subscribe = await db.usersCourses.findOne({
    where: {
      userId,
      courseId,
    },
  });

  const response = {
    status: 200,
    message: (!subscribe) ? 'User haven\'t subscribed' : ' User has already signed',
    data: subscribe,
  };
  
  return BaseResponse.responseBuilder(response);
}

module.exports = {
  getCoursePreview,
  getCoursesByAttribute,
  getCoursesForCarousel,
  subscribeUserToCourse,
  getSubscriptionUserToCourse
};
