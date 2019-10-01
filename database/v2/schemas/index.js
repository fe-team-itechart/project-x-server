const Users = require('./users.model');
const PublicProfiles = require('./public-profile.model');
const SettsProfiles = require('./setts-profile.model');
const Courses = require('./course.model');
const UsersCourses = require('./users-courses.model');
const CourseCategories = require('./course-categories.model');
const Categories = require('./categories.model');
const CourseComments = require('./course-comments.model');

module.exports = {
  Users,
  PublicProfiles,
  SettsProfiles,
  Courses,
  Categories,
  CourseCategories,
  CourseComments,
  UsersCourses,
};
