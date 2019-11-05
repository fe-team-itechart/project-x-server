const readXlsxFile = require('read-excel-file/node');

async function getMockData() {
  const rows = await readXlsxFile('../v2/asserts/mock-users-courses.xlsx');
  const data = [];
  for (let index = 2; index < rows.length; index++) {
    const row = rows[index];
    data.push({
      userId: row[0],
      courseId: row[1],
    });
  }
  return data;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await getMockData();
    return queryInterface.bulkInsert('users_courses', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users_courses', null, {});
  },
};
