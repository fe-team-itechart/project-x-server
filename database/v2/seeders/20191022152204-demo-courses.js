const readXlsxFile = require('read-excel-file/node');

async function getMockData() {
  const rows = await readXlsxFile('../v2/asserts/mock-courses.xlsx');
  const data = [];
  for (let index = 2; index < 17; index++) {
    const row = rows[index];
    data.push({
      id: row[0],
      courseName: row[1].slice(0, 64),
      description: row[2],
      rating: row[3],
      numberOfEnrolledStudents: row[4],
      authors: row[5],
      language: row[6],
      creatorId: row[7]
    })
  }
  return data;
};
  

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await getMockData();
    return queryInterface.bulkInsert('courses', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courses', null, {});
  }
};
