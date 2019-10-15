const users = require('./users.model');
const publicProfiles = require('./public-profile.model');
const settsProfiles = require('./setts-profile.model');
const courses = require('./course.model');
const usersCourses = require('./users-courses.model');
const courseReviews = require('./course-reviews.model');
const profits = require('./profits.model');

module.exports = {
  users,
  publicProfiles,
  settsProfiles,
  courses,
  courseReviews,
  usersCourses,
  profits
};
