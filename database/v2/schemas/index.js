const users = require('./users.model');
const publicProfiles = require('./public-profile.model');
const courses = require('./course.model');
const usersCourses = require('./users-courses.model');
const courseReviews = require('./course-reviews.model');
const profits = require('./profits.model');
const categories = require('./categories.model');
const courseCategories = require('./course-categories.model');

module.exports = {
  users,
  publicProfiles,
  courses,
  courseReviews,
  usersCourses,
  profits,
  categories,
  courseCategories
};
