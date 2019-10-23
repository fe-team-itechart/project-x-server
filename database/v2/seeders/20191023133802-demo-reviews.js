const readXlsxFile = require('read-excel-file/node');

async function getMockData() {
  const rows = await readXlsxFile('../v2/asserts/mock-reviews.xlsx');
  const data = [];
  for (let index = 2; index < rows.length; index++) {
    const row = rows[index];
    data.push({
      id: row[0],
      rating: row[1],
      text: row[2],
      courseId: row[3],
      userId: row[4]
    })
  }
  return data;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await getMockData();
    return queryInterface.bulkInsert('course_reviews', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('course_reviews', null, {});
  }
};
