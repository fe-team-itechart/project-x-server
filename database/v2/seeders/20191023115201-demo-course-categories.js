const readXlsxFile = require('read-excel-file/node');

async function getMockData() {
  const rows = await readXlsxFile('../v2/asserts/mock-course-categories.xlsx');
  const data = [];
  for (let index = 1; index < rows.length; index++) {
    const row = rows[index];
    data.push({
      courseId: row[0],
      categoryId: row[1],
    });
  }
  return data;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await getMockData();
    return queryInterface.bulkInsert('courses_categories', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courses_categories', null, {});
  },
};
