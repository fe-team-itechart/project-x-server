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
        attributes: [
          'id',
          'rating',
          'text',
          'createdAt',
          'updatedAt',
          'userId',
        ],
        include: [
          {
            model: db.users,
            attributes: ['userName'],
          },
        ],
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

const getCoursesByCategories = async categoriesList => {
  const preparedCategoriesList = String(categoriesList)
    .split(',')
    .map(el => {
      return `'${el}'`;
    })
    .join(',');

  const query = `SELECT 
    courses.id,
    courses."courseName",
    courses.description, 
    courses.rating,
    courses.price,
    courses."numberOfEnrolledStudents",
    courses.authors,
    courses.language,
    courses."createdAt",
    courses."updatedAt",
    courses."creatorId"
  FROM public.courses, (SELECT courses_categories."courseId" FROM  
    public.courses_categories, 
    (SELECT id 
    FROM public.categories 
    WHERE categories.title in (${preparedCategoriesList})) 
    as selected_categories 
    WHERE selected_categories.id = courses_categories."categoryId" 
    GROUP BY courses_categories."courseId" 
    ORDER BY courses_categories."courseId" ASC) as selected_courses 
  WHERE selected_courses."courseId" = courses.id`;

  const courses = await db.sequelize.query(query, {
    type: db.sequelize.QueryTypes.SELECT,
  });

  return BaseResponse.responseBuilder({
    status: 200,
    message: 'Success',
    data: courses,
  });
};

module.exports = {
  getCoursePreview,
  getCoursesByAttribute,
  getCoursesForCarousel,
  getCoursesByCategories,
};
